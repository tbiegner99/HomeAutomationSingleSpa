import { BaseDatasource } from '@tbiegner99/home-automation-app-helpers';
import PlaylistSerializer from './serializers/PlaylistSerializer';

const DEFAULT_PLAYLIST_ID = 1;
const GET_PLAYLIST_ITEMS = `/playlist/${DEFAULT_PLAYLIST_ID}/items`;
const ENQUEUE_ITEM = `/playlist/${DEFAULT_PLAYLIST_ID}/items`;
const deletePlaylistItemUrl = (position) => `/playlist/${DEFAULT_PLAYLIST_ID}/items/${position}`;
const CLEAR_PLAYLIST = `/playlist/${DEFAULT_PLAYLIST_ID}`;
const moveUrl = (position) => `/playlist/${DEFAULT_PLAYLIST_ID}/items/${position}`;

class PlaylistDatasource extends BaseDatasource {
  async getPlaylistItems() {
    const url = this.constructUrl(GET_PLAYLIST_ITEMS);
    const results = await this.client.get(url);
    return PlaylistSerializer.fromPlaylistResponse(results.data);
  }

  async addToEndOfPlaylist(songId) {
    const url = this.constructUrl(ENQUEUE_ITEM);
    const request = PlaylistSerializer.toEnqueueAtEndRequest(songId);
    const response = await this.client.post(url, request);
    return PlaylistSerializer.fromPlaylistResponse(response.data);
  }

  async deletePlaylistItem(item) {
    const path = deletePlaylistItemUrl(item.position);
    const url = this.constructUrl(path);
    await this.client.delete(url);
  }

  async clearPlaylist() {
    const url = this.constructUrl(CLEAR_PLAYLIST);
    await this.client.delete(url);
  }

  async moveItemUp(item) {
    const url = this.constructUrl(moveUrl(item.position));
    const request = PlaylistSerializer.toMoveUpRequest(item);
    const response = await this.client.put(url, request);
    return PlaylistSerializer.fromPlaylistResponse(response.data);
  }

  async moveItemDown(item) {
    const url = this.constructUrl(moveUrl(item.position));
    const request = PlaylistSerializer.toMoveDownRequest(item);
    const response = await this.client.put(url, request);
    return PlaylistSerializer.fromPlaylistResponse(response.data);
  }
}

export default new PlaylistDatasource();
