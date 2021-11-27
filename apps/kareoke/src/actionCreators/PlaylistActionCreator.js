import { BaseActionCreator } from '@tbiegner99/home-automation-app-helpers';
import PlaylistDatsource from '../datasource/PlaylistDatasource';
import PlaylistEvents from '../events/PlaylistEvents';

class PlaylistActionCreator extends BaseActionCreator {
  async getPlaylistItems() {
    try {
      const playlist = await PlaylistDatsource.getPlaylistItems();
      this.dispatch({ type: PlaylistEvents.PLAYLIST_LOADED, data: playlist });
      return playlist;
    } catch (err) {
      this.dispatch({ type: PlaylistEvents.PLAYLIST_LOAD_ERROR, data: err });
      throw err;
    }
  }

  async addToEndOfPlaylist(songId) {
    try {
      const playlistData = await PlaylistDatsource.addToEndOfPlaylist(songId);
      this.dispatch({ type: PlaylistEvents.SONG_ADDED, data: songId });
      this.dispatch({ type: PlaylistEvents.PLAYLIST_LOADED, data: playlistData });
    } catch (err) {
      this.dipatch({ type: PlaylistEvents.ERROR_ADDING_SONG, data: err });
      throw err;
    }
  }

  async moveItemUp(item) {
    try {
      const playlistData = await PlaylistDatsource.moveItemUp(item);
      this.dispatch({ type: PlaylistEvents.ITEM_MOVED, data: item });
      this.dispatch({ type: PlaylistEvents.PLAYLIST_LOADED, data: playlistData });
    } catch (err) {
      this.dipatch({ type: PlaylistEvents.ERROR_MOVING_ITEM, data: err });
      throw err;
    }
  }

  async moveItemDown(item) {
    try {
      const playlistData = await PlaylistDatsource.moveItemDown(item);
      this.dispatch({ type: PlaylistEvents.ITEM_MOVED, data: item });
      this.dispatch({ type: PlaylistEvents.PLAYLIST_LOADED, data: playlistData });
    } catch (err) {
      this.dipatch({ type: PlaylistEvents.ERROR_MOVING_ITEM, data: err });
      throw err;
    }
  }

  async deletePlaylistItem(playlistItem) {
    try {
      await PlaylistDatsource.deletePlaylistItem(playlistItem);
      this.dispatch({ type: PlaylistEvents.ITEM_DELTETED, data: playlistItem });
      return await this.getPlaylistItems();
    } catch (err) {
      this.dipatch({ type: PlaylistEvents.ERROR_DELETING_PLAYLIST_ITEM, data: err });
      throw err;
    }
  }

  async clearPlaylist() {
    try {
      await PlaylistDatsource.clearPlaylist();
      this.dispatch({ type: PlaylistEvents.PLAYLIST_CLEARED });
      this.dispatch({ type: PlaylistEvents.PLAYLIST_LOADED, data: [] });
    } catch (err) {
      this.dipatch({ type: PlaylistEvents.ERROR_CLEARING_PLAYLIST, data: err });
      throw err;
    }
  }
}
export default new PlaylistActionCreator();
