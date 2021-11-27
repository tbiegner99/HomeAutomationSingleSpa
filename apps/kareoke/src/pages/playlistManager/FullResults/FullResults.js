import React from 'react';
import { H4 } from '@tbiegner99/home-automation-components';
import SearchResultItem from './SearchResultItem';
import styles from './FullResults.css';

const AddIcon = (props) => <button {...props}>+</button>;

class FullResults extends React.Component {
  renderSource(source) {
    const { onAdd } = this.props;
    return (
      <div>
        <H4>{source.source}</H4>
        <AddIcon onClick={() => onAdd(source.songId)} />
      </div>
    );
  }

  renderSources(sources) {
    return sources.map((source) => this.renderSource(source));
  }

  renderTitleCard(artist, title, data) {
    const { onAdd } = this.props;
    const song = {
      artist,
      title,
      sources: data.sources
    };
    return <SearchResultItem song={song} onAdd={onAdd} />;
  }

  renderTitlesForArtist(artist, titles) {
    return Object.entries(titles).map(([title, data]) => this.renderTitleCard(artist, title, data));
  }

  renderResultsSection(results) {
    if (!results) return null;
    return Object.entries(results).map(([artist, titles]) =>
      this.renderTitlesForArtist(artist, titles)
    );
  }

  render() {
    const { results } = this.props;
    if (!results || Object.keys(results).length === 0) {
      return null;
    }
    return <section className={styles.searchResults}>{this.renderResultsSection(results)}</section>;
  }
}

export default FullResults;
