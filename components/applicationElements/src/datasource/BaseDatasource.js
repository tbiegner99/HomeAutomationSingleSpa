import axios from 'axios';

const BASE_URL = '/api/kareoke';

class BaseDatasource {
  constructor(config, baseUrl = BASE_URL) {
    this.baseUrl = baseUrl;
    this._client = axios.create(config);
  }

  constructUrl(url) {
    return `${this.baseUrl}${url}`;
  }

  get client() {
    return this._client;
  }
}

export default BaseDatasource;
