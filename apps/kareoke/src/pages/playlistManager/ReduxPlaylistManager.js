import { connect } from 'react-redux';
import PlaylistManager from './PlaylistManager';
import SongsActionCreator from '../../actionCreators/SongsActionCreator';
import PlaylistActionCreator from '../../actionCreators/PlaylistActionCreator';

const mapStateToProps = (state) => ({
  playlist: state.playlist.store.playlistData.value,
  searchResults: state.songs.store.searchResults.value,
  autoCompleteResults: state.songs.store.autoCompleteResults.value
});

const mapDispatchToProps = () => ({
  onAutoCompleteSearch: async (searchValue) => {
    try {
      await SongsActionCreator.autoCompleteSearch(searchValue);
    } catch (err) {}
  },
  onFullSearch: async (data) => {
    try {
      await SongsActionCreator.searchSongsBy(data.searchText, data);
    } catch (err) {}
  },
  async onAddSong(songId) {
    try {
      await PlaylistActionCreator.addToEndOfPlaylist(songId);
    } catch (err) {}
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistManager);
