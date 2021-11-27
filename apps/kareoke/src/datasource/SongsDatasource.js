import { BaseDatasource } from '@tbiegner99/home-automation-app-helpers';
import SongsSerializer from './serializers/SongsSerializer';

const LIMIT = 5;
const songsUrlWithLimit = (limit) => `/songs/search?limit=${limit}`;

class SongsDatasource extends BaseDatasource {
  async searchSongsBy(searchText, options, searchType) {
    const url = this.constructUrl(songsUrlWithLimit(options.limit || LIMIT));
    const body = SongsSerializer.toSearchRequest(searchText, options, searchType);
    const results = await this.client.post(url, body);
    if (options.resultType === 'full') {
      return SongsSerializer.fromFullSearchResults(results.data);
    }
    return results.data.map(SongsSerializer.fromSearchResult);
  }
}

export default new SongsDatasource();
