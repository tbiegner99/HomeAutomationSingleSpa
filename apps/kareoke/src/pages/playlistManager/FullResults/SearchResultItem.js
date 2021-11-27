import React from 'react';
import combineClasses from 'classnames';
import { H2 } from '@tbiegner99/home-automation-components';
import { AddIcon, OpenDrawer, CloseDrawer } from '../../../icons/Icons';
import styles from './SearchResultItem.css';

const AddButton = (props) => (
  <div {...props} className={combineClasses(styles.addButton, props.className)}>
    <AddIcon className={styles.addButtonIcon} />
    Add
  </div>
);

const SongInfo = (props) => {
  const { song } = props;
  return (
    <section>
      <div className={styles.title}>{song.title}</div>
      <div className={styles.subtitle}>{song.artist}</div>
    </section>
  );
};

const QuickActions = (props) => {
  const {
    onAdd,
    song: { sources, ...basicSongInfo }
  } = props;
  const firstSong = sources[0];
  const songInfo = { ...basicSongInfo, ...firstSong };
  return (
    <section>
      <AddButton onClick={() => onAdd(songInfo)} />
    </section>
  );
};

const MainCard = (props) => (
  <div className={styles.songCard}>
    <SongInfo song={props.song} />
    <QuickActions {...props} />
  </div>
);

const SourceInfo = (props) => {
  const { songId, source } = props.source;
  return (
    <section>
      <div>{source}</div>
      <div>{songId}</div>
    </section>
  );
};

const SourceCard = (props) => {
  const {
    source,
    onAdd,
    song: { sources, ...basicSongInfo }
  } = props;
  const songInfo = { ...basicSongInfo, ...source };
  return (
    <div className={styles.sourceCardContainer}>
      <div className={styles.sourceCard}>
        <SourceInfo source={source} />
        <section>
          <AddButton onClick={() => onAdd(songInfo)} />
        </section>
      </div>
    </div>
  );
};

const AdditionalSources = (props) => {
  const { onAdd, sources, isOpen, song } = props;
  const toSourceCard = (source) => <SourceCard song={song} source={source} onAdd={onAdd} />;
  const otherSources = sources.slice(1);
  return (
    <div className={combineClasses(styles.additionalSources, { [styles.open]: isOpen })}>
      {isOpen && otherSources.map(toSourceCard)}
    </div>
  );
};

class Sources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { song, onAdd } = this.props;
    const { isOpen } = this.state;
    if (song.sources.length <= 1) {
      return null;
    }
    return (
      <section>
        <div className={styles.sourcesHeader} onClick={() => this.toggleOpen()}>
          <div className={styles.drawerIcon}>{isOpen ? <CloseDrawer /> : <OpenDrawer />}</div>
          <H2>Choose Other Source</H2>
        </div>
        <AdditionalSources song={song} sources={song.sources} isOpen={isOpen} onAdd={onAdd} />
      </section>
    );
  }
}

const SearchResultItem = (props) => (
  <div className={styles.resultItem}>
    <MainCard {...props} />
    <Sources {...props} />
  </div>
);
export default SearchResultItem;
