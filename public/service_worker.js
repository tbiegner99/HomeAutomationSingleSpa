const CACHE_VERSION = 'version-1';
const ONE_MIN = 60 * 1000;
const importMapUrl = '/config/import-map.json';
const urlsToCache = [
  '/',
  '/home-automation-main.js',
  '/config/import-map.json',
  '/images/main_icon.svg',
  '/icons/@tbiegner99/home-automation-app-todo/icon.svg',
  '/icons/@tbiegner99/home-automation-app-tv/icon.svg',
  '/icons/@tbiegner99/home-automation-app-kareoke/icon.svg',
  '/icons/@tbiegner99/home-automation-app-weather/icon.svg',
  'https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js',
  'https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.min.js',

  '/offline.html'
];

const apiPrefixes = ['/api', '/stream'];
const offlineApiPrefixes = [{ method: 'post', url: '/api/todo/list' }];

const isImage = (request) => request.url.match(/\.(png|svg|jpe?g)/);

const isStyle = (request) => request.url.match(/\.(css)/);

const isScript = (request) => request.url.match(/\.(js|json)/);

const isApiRequest = (request) => {
  const url = new URL(request.url);
  console.log(url.pathname);
  return apiPrefixes.some((prefix) => url.pathname.startsWith(prefix));
};

const isOfflineApi = (request) => {
  const url = new URL(request.url);
  return offlineApiPrefixes.some(
    (req) =>
      url.pathname.startsWith(req.url) && request.method.toLowerCase() === req.method.toLowerCase()
  );
};
const isExternal = (request) => {
  if (!request.referrer) {
    return false;
  }
  const ref = new URL(request.referrer);
  const url = new URL(request.url);
  return ref.origin !== url.origin;
};
const DB_NAME = 'failed_requests';
const DB_VERSION = 1;
const OBJECT_STORE = 'requests';

class DBCursor {
  static async create(objectStore) {
    return new Promise((resolve) => {
      const dbCursor = new DBCursor();
      dbCursor._storeCursor = objectStore.openCursor();
      // eslint-disable-next-line no-param-reassign
      dbCursor._storeCursor.onsuccess = (evt) => {
        dbCursor.cursor = evt.target.result;
        resolve(dbCursor);
      };
    });
  }

  async *items() {
    while (this.hasNext()) {
      yield this.next();
    }
  }

  async next() {
    if (!this.hasNext()) {
      return undefined;
    }
    return new Promise((resolve) => {
      const { key, value } = this.cursor;
      this._storeCursor.onsuccess = (evt) => {
        this.cursor = evt.target.result;
        resolve({
          key,
          value
        });
      };
      this.cursor.continue();
    });
  }

  hasNext() {
    return Boolean(this.cursor);
  }
}
class RequestDatabase {
  getIndexes() {
    return [];
  }

  getIterator() {
    const objectStore = this.db.transaction([OBJECT_STORE]).objectStore(OBJECT_STORE);
    return DBCursor.create(objectStore);
  }

  async getAllEntries() {
    const iterator = await this.getIterator();
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of iterator.items()) {
      result.push(item);
    }
    return result;
  }

  async getAllItems() {
    return new Promise((resolve, reject) => {
      const objectStore = this.db.transaction([OBJECT_STORE]).objectStore(OBJECT_STORE);
      objectStore.getAll().onsuccess = (event) => {
        console.log(event.target.result);
        resolve(event.target.result);
      };
      objectStore.getAll().onerror = (event) => {
        reject(event.target.result);
      };
    });
  }

  async deleteByKey(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([OBJECT_STORE], 'readwrite');
      transaction.oncomplete = () => {};
      transaction.onerror = () => {};
      const objectStore = transaction.objectStore(OBJECT_STORE);
      const addRequest = objectStore.delete(key);
      addRequest.onsuccess = (e) => {
        resolve(e);
      };
      addRequest.onerror = (e) => {
        reject(e);
      };
    });
  }

  async addRequest(req) {
    const body = await req.text();
    const saveObject = {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
      body,
      mode: req.mode,
      credentials: req.credentials,
      cache: req.cache,
      redirect: req.redirect,
      integrity: req.integrity,
      url: req.url
    };
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([OBJECT_STORE], 'readwrite');
      transaction.oncomplete = () => {};
      transaction.onerror = () => {};
      const objectStore = transaction.objectStore(OBJECT_STORE);
      const addRequest = objectStore.add(saveObject);
      addRequest.onsuccess = (e) => {
        resolve(e);
      };
      addRequest.onerror = (e) => {
        reject(e);
      };
    });
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open(DB_NAME, DB_VERSION);
      dbRequest.onerror = (e) => {
        reject(e);
      };
      dbRequest.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(e);
      };
      dbRequest.onupgradeneeded = (e) => {
        const db = e.target.result;
        const store = db.createObjectStore(OBJECT_STORE, { autoIncrement: true });
        this.getIndexes().forEach((index) => {
          store.createIndex(index.name, index.keyPath, index.options);
        });
      };
    });
  }
}

let resendTimeout;
const db = new RequestDatabase();
db.initialize().catch((err) => console.error(err));

const resendRequest = async (dbRecord) => {
  const { key, value } = dbRecord;
  try {
    const response = await fetch(value.url, value);
    if (response.status < 500) {
      await db.deleteByKey(key);
    }
  } catch (err) {
    console.log(err);
  }
};

const batchItems = (items, batchSize) => {
  const result = [];
  for (let i = 0; i < items.length; ) {
    const batch = [];
    for (let j = 0; j < batchSize && i < items.length; i++, j++) {
      batch.push(items[i]);
    }
    result.push(batch);
  }
  return result;
};
const resendBatch = (items) => Promise.all(items.map((req) => resendRequest(req)));

const resendStoredRequests = async () => {
  if (resendTimeout) {
    clearTimeout(resendTimeout);
  }
  try {
    const items = await db.getAllEntries();
    const batches = batchItems(items, 5);
    console.log(batches);
    return Promise.all(batches.map((batch) => resendBatch(batch)));
  } catch (err) {
    return undefined;
  }
};

const saveRequest = async (request) => {
  let saveEvent;
  try {
    saveEvent = await db.addRequest(request);
    if (navigator.onLine) {
      setTimeout(() => resendStoredRequests(), ONE_MIN); // different network error than just being offline
    }
    return new Response('', {
      status: 212,
      statusText: 'OFFLINE_DEFERRED',
      headers: {
        'content-type': 'application/json',
        'x-request-key': saveEvent.target.result
      }
    });
  } catch (err) {
    return new Response('', {
      status: 599,
      statusText: 'OFFLINE_DEFERRAL_FAILURE'
    });
  }
};

const handleOfflineAPI = async (request) => {
  const copy = request.clone();
  try {
    const resp = await fetch(request);
    return resp;
  } catch (err) {
    return saveRequest(copy);
  }
};
const install = async () => {
  const response = await fetch(importMapUrl);
  const importMap = await response.json();
  const scripts = Object.values(importMap.imports);
  const urls = urlsToCache.concat(scripts);

  caches
    .open(CACHE_VERSION)
    .then((cache) => {
      console.log('Opened cache', urls);

      return cache.addAll(urls);
    })
    .catch((err) => console.log(err));
};
// Install SW
this.addEventListener('install', (event) => {
  console.log('INSTALLING');
  event.waitUntil(install());
});

const tryToUpdateAsset = async (request) => {
  const networkResponse = await fetch(request);
  const cache = await caches.open(CACHE_VERSION);
  await cache.put(request, networkResponse.clone());
  return networkResponse;
};

const findCachedRequest = async (request) => {
  const cachedResponse = await caches.match(request);
  if (!cachedResponse) {
    return {
      promise: tryToUpdateAsset(request),
      needsUpdate: false
    };
  }
  console.log(`CACHE HIT: ${request.url}`);
  return {
    promise: cachedResponse,
    needsUpdate: true
  };
};

// Listen for requests
this.addEventListener('fetch', (event) => {
  if (isImage(event.request) || isScript(event.request) || isStyle(event.request)) {
    const getCache = findCachedRequest(event.request);
    event.respondWith(
      getCache.then((result) => {
        if (result.needsUpdate) {
          tryToUpdateAsset(event.request).catch(() => {});
        }
        return result.promise;
      })
    );
  } else if (isOfflineApi(event.request)) {
    const promise = handleOfflineAPI(event.request);
    event.respondWith(promise);
  } else if (isExternal(event.request) || isApiRequest(event.request)) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(caches.match('/'));
  }
});

// Activate the SW
this.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      )
    )
  );
});

this.addEventListener('message', (evt) => {
  if (evt.data.type === 'ONLINE') {
    resendStoredRequests();
  }
});
