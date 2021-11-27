const LoadingStates = {
  NOT_LOADED: 'NOT_LOADED',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR'
};

const NOOP = () => {};
class StoreField {
  static LoadingStates = LoadingStates;

  constructor(name, defaultValue, onLoad) {
    this._name = name;
    this._loadAction = onLoad || NOOP;
    this._loadState = defaultValue ? LoadingStates.DONE : LoadingStates.NOT_LOADED;
    this._value = defaultValue;
    this._error = null;
  }

  get error() {
    return this._error;
  }

  set error(err) {
    this._error = err;
    this._loadState = LoadingStates.ERROR;
  }

  get name() {
    return this._name;
  }

  get loadState() {
    return this._loadState;
  }

  set onLoad(action) {
    this._loadAction = action;
  }

  loading() {
    this._loadState = LoadingStates.LOADING;
  }

  async loadValue() {
    if (this.loadState !== LoadingStates.LOADING) {
      this._loadState = LoadingStates.LOADING;
      try {
        await this._loadAction();
      } catch (err) {
        // avoid unhandled promise
      }
    }
  }

  set value(value) {
    this._value = value;
    this._loadState = LoadingStates.DONE;
  }

  get value() {
    if (this.loadState !== LoadingStates.DONE) {
      this.loadValue();
    }
    return this._value;
  }

  get valueIfNotLoading() {
    if (this.loadState !== LoadingStates.DONE) {
      this.loadValue();
      return null;
    }
    return this._value;
  }
}

export { LoadingStates };
export default StoreField;
