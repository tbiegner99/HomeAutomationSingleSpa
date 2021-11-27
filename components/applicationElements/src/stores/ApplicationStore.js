import AbstractReducingStore from './AbstractReducingStore';
import StoreField from './StoreField';
import UrlEvents from '../events/UrlEvents';

class ApplicationStore extends AbstractReducingStore {
  constructor() {
    super();
    this.data = {
      currentUrl: new StoreField('currentUrl', window.location.pathname)
    };
  }

  get currentUrl() {
    return this.data.currentUrl;
  }

  handleEvent(action) {
    switch (action.type) {
      case UrlEvents.CHANGE_URL:
        this.data.currentUrl.value = action.data.url;
        break;
      default:
        return false;
    }
    return true;
  }
}

export default new ApplicationStore();
