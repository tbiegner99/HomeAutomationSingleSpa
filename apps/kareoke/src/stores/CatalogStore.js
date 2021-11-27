import { AbstractReducingStore, StoreField } from '@tbiegner99/home-automation-app-helpers';

class CatalogStore extends AbstractReducingStore {
  constructor() {
    super();
    this.data = {
      userData: new StoreField('userData', null, this.loadUserData.bind(this)),
      authenticated: new StoreField('authenticated', false, this.checkAuthenticated.bind(this))
    };
  }

  get userData() {
    return this.data.userData;
  }

  get authenticated() {
    return this.data.authenticated;
  }

  loadUserData() {
    // return UserActionCreator.loadUserInfo();
  }

  checkAuthenticated() {
    this.data.userData.loadValue();
  }

  handleEvent(action) {
    switch (action.type) {
      default:
        return false;
    }
  }
}

export default new CatalogStore();
