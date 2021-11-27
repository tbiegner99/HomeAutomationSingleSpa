import React from 'react';
import { H3, H6, H1 } from '@tbiegner99/home-automation-components';
import songs from './songs.json';

import styles from './catalog.css';


class Catalog extends React.Component {
  componentWillMount() {
    const byArtist = {};
    const byTitle = {};
    songs.forEach((element) => {
      const artistIndexChar = element.artist.charAt(0).toUpperCase();
      if (!byArtist[artistIndexChar]) {
        byArtist[artistIndexChar] = { [element.artist]: [element] };
      } else if (byArtist[artistIndexChar][element.artist]) {
        byArtist[artistIndexChar][element.artist].push(element);
      } else {
        byArtist[artistIndexChar][element.artist] = [element];
      }
    });
    this.byArtist = byArtist;
  }

  renderArtist(artist, songs) {
    return [
      <H3>{artist}</H3>,
      ...songs.map((el) => (
        <H6>
          {el.id} - {el.title} [{el.source}]
        </H6>
      ))
    ];
  }

  renderLetter(letter) {
    const artists = Object.keys(this.byArtist[letter]).sort();
    return [
      <H1>{letter}</H1>,
      ...artists.map((artist) => this.renderArtist(artist, this.byArtist[letter][artist]))
    ];
  }

  render() {
    const keys = Object.keys(this.byArtist).sort();
    return <main className={styles.page}>{keys.map((letter) => this.renderLetter(letter))}</main>;
  }
}

export default Catalog;
