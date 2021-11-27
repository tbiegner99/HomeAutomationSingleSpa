import DispatcherFactory from '../dispatcher/DispatcherFactory';
import UrlEvents from '../events/UrlEvents';

class BaseActionCreator {
  dispatch(action, data) {
    DispatcherFactory.dispatch(action);
  }


  changeUrl(redirectLocation) {
    this.dispatch({
      type: UrlEvents.CHANGE_URL,
      data: {
        url: redirectLocation
      }
    });
  }
}

export default BaseActionCreator;
