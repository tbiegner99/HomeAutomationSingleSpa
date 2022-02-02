import { registerApplication, start } from 'single-spa';

const matchRoutes = (config) => {
  if (Array.isArray(config.routes)) {
    return config.routes;
  }
  const { mode, routes } = config.routes;
  const hasExactRoute = (location) => routes.some((route) => location.pathname === route);
  if (mode === 'exact') {
    return hasExactRoute;
  } else if (mode === 'exclude') {
    return (location) => !routes.some((route) => location.pathname.startsWith(route));
  } else if (mode === 'excludeExact') {
    return (location) => !hasExactRoute(location);
  }
  return routes;
};

const convertConfig = (config, customProps) => {
  const { role = 'app' } = config;
  const domElement = document.querySelector(`[data-role="${role}"]`);
  let props = customProps;
  if (domElement) {
    props = Object.assign({}, props, {
      domElement
    });
  }
  return {
    name: config.name,
    app: () => System.import(config.package),
    activeWhen: matchRoutes(config),
    customProps: props
  };
};

const startApp = async () => {
  const configFile = await System.import('appConfig');
  const appConfigs = configFile.default;
  const appConfigMap = appConfigs.reduce(
    (obj, config) => Object.assign(obj, { [config.name]: config }, {}),
    {}
  );
  window.addEventListener('single-spa:app-change', (evt) => {
    const mountedApps = evt.detail.appsByNewStatus.MOUNTED.map(
      (appName) => appConfigMap[appName]
    ).filter((config) => config.priority > 0 && (config.role === 'app' || !config.role));

    const event = new CustomEvent('app-changed', { detail: mountedApps[0] });
    window.dispatchEvent(event);
  });

  const byPriorityDesc = (app1, app2) => {
    if (app1.priority < app2.priority) {
      return 1;
    } else if (app1.priority > app2.priority) {
      return -1;
    } else if (app1.title < app2.title) {
      return -1;
    }
    return 1;
  };
  const apps = appConfigs.filter((app) => app.priority > 0).sort(byPriorityDesc);

  const customProps = { apps };
  // registerApplication({
  //   name: 'home',
  //   // eslint-disable-next-line import/no-unresolved
  //   app: () => System.import('home'),
  //   activeWhen: (location) => location.pathname === '/',
  //   customProps
  // });

  appConfigs
    .filter((app) => Boolean(app.routes))
    .forEach((config) => {
      const registrationConfig = convertConfig(config, customProps);
      registerApplication(registrationConfig);
    });

  start();
};

startApp()
  .then(() => {
    console.log('App Started');
  })
  .catch((err) => console.log(err));
