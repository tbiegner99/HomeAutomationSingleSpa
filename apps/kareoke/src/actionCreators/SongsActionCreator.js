import { BaseActionCreator } from '@tbiegner99/home-automation-app-helpers';
import SongsDatasource from '../datasource/SongsDatasource';
import SongsEvents from '../events/SongsEvents';

const TEXT = 'text';

class SongsActionCreator extends BaseActionCreator {
  async searchSongsBy(searchText, options, type = TEXT) {
    try {
      const opts = Object.assign({}, options, { resultType: 'full', limit: 100 });
      const results = await SongsDatasource.searchSongsBy(searchText, opts, type);
      this.dispatch({ type: SongsEvents.SEARCH_RESULTS, data: results });
      return results;
    } catch (err) {
      this.dispatch({ type: SongsEvents.SEARCH_ERROR, data: err });
      throw err;
    }
  }

  async autoCompleteSearch(searchText, type = TEXT) {
    try {
      const results = await SongsDatasource.searchSongsBy(searchText, {}, type);
      this.dispatch({ type: SongsEvents.AUTO_COMPLETE_RESULTS, data: results });
      return results;
    } catch (err) {
      this.dispatch({ type: SongsEvents.AUTO_COMPLETE_ERROR, data: err });
      throw err;
    }
  }
}
export default new SongsActionCreator();
