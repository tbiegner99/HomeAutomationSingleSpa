import React from 'react';
import { H3, ListItem, List } from '@tbiegner99/home-automation-components';

import styles from './PlaylistMenu.css';

const ClearPlaylistLink = (props) => {
  if (props.empty) return null;
  return (
    <a className={styles.clearLink} onClick={props.onClick}>
      Clear Playlist
    </a>
  );
};
const EmptyPlaylist = () => <div className={styles.emptyPlaylist}>No Items In Playlist</div>;

class PlaylistMenu extends React.Component {
  componentDidMount() {
    const { onFetchPlaylistChanges } = this.props;
    this.pollPlaylist = setInterval(() => onFetchPlaylistChanges(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.pollPlaylist);
  }

  render() {
    const { playlist, onMoveItemUp, onMoveItemDown, onDeleteItem, onClearPlaylist } = this.props;
    if (!playlist) return null;
    const toPlaylistItem = (item, index) => (
      <ListItem
        title={item.title}
        subtitle={item.artist}
        onMoveUp={() => onMoveItemUp(item)}
        onMoveDown={() => onMoveItemDown(item)}
        onDelete={() => onDeleteItem(item)}
        canMoveUp={index > 0}
        canMoveDown={index < playlist.length - 1}
      />
    );
    const isEmpty = playlist.length === 0;
    const playlistItems = isEmpty ? <EmptyPlaylist /> : playlist.map(toPlaylistItem);
    return (
      <div>
        <H3 className={styles.playlistHeader}>Current Playlist</H3>
        <List>{playlistItems}</List>
        <ClearPlaylistLink empty={isEmpty} onClick={onClearPlaylist} />
      </div>
    );
  }
}

export default PlaylistMenu;
