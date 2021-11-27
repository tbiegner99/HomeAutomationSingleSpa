import React from 'react';
import { H3 } from '@tbiegner99/home-automation-components';
import styles from './ResultsPreview.css';

const emboldenSearchValue = (value, results) => {
  const boldComponent = <b>{value}</b>;
  const split = results.split(value);
  const joined = [split[0]];
  for (let i = 1; i < split.length; i++) {
    joined.push(boldComponent);
    joined.push(split[i]);
  }
  return joined;
};

const hasElements = (arr) => arr && arr.length;

const AddIcon = (props) => <div {...props}>+</div>;

const renderTitle = (title, searchValue) =>
  !title ? null : <div>{emboldenSearchValue(searchValue, title)}</div>;
const renderArtist = (artist, searchValue) => renderTitle(artist, searchValue);

const toRenderedItem = (item, searchValue, onAdd) => (
  <div className={styles.item}>
    <section>
      {renderTitle(item.title || item.artist, searchValue)}
      {renderArtist(item.artist, searchValue)}
    </section>
    <section>
      <AddIcon />
    </section>
  </div>
);

class ResultsPreview extends React.Component {
  renderResultsSection(title, results) {
    if (!hasElements(results)) return null;
    const { searchValue, onAddItem } = this.props;
    return (
      <section>
        <H3>{title}</H3>
        <div>{results.map((song) => toRenderedItem(song, searchValue, onAddItem))}</div>
      </section>
    );
  }

  render() {
    const {
      results: { artist, title, id }
    } = this.props;
    return (
      <section>
        {this.renderResultsSection('Results By Title', title)}
        {this.renderResultsSection('Results By Artist', artist)}
        {this.renderResultsSection('Results By Id', id)}
      </section>
    );
  }
}

export default ResultsPreview;
