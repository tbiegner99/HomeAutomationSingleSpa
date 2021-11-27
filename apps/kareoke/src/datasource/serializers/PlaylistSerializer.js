const EnqueueStrategies = {
  AT_END: 'atEnd'
};

class PlaylistSerializer {
  fromPlaylistItemResponse(item) {
    return {
      position: item.position,
      songId: item.songId,
      title: item.title,
      artist: item.artist,
      source: item.source
    };
  }

  fromPlaylistResponse(playlist) {
    return playlist.map((item) => this.fromPlaylistItemResponse(item));
  }

  toEnqueueAtEndRequest(songId) {
    return {
      method: EnqueueStrategies.AT_END,
      songId
    };
  }

  toMoveUpRequest() {
    return {
      method: 'up'
    };
  }

  toMoveDownRequest() {
    return {
      method: 'down'
    };
  }
}

export default new PlaylistSerializer();
