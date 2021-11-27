import React from 'react';
import { H3, Modal } from '@tbiegner99/home-automation-components';
import { Form, Button, RadioButton, InputGroup, TextInput } from '@tbiegner99/react-forms';
import ResultsPreview from './ResultsPreview/ResultsPreview'; 
import FullResults from './FullResults/FullResults';

import styles from './playlistManager.css';

const partitionArray = (arr, groupingFunc) => {
  const result = {};
  arr.forEach((item) => {
    const key = groupingFunc(item);
    const array = result[key] || [];
    array.push(item);
    result[key] = array;
  });
  return result;
};

class PlaylistManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddSong(song) {
    if (this.existsInPlaylist(song)) {
      this.setState({
        confirmAdd: song
      });
    } else {
      this.props.onAddSong(song.songId);
    }
  }

  existsInPlaylist(song) {
    const { playlist } = this.props;
    return playlist.filter((item) => item.songId === song.songId).length > 0;
  }

  changeSearchText(value) {
    this.setState({ value });
    if (value.length >= 3) {
      this.props.onAutoCompleteSearch(value);
    }
  }

  fullSearch(data) {
    this.props.onFullSearch(data);
  }

  cancelAdd() {
    this.setState({ confirmAdd: null });
  }

  renderConfirmModal() {
    const { confirmAdd } = this.state;
    const { onAddSong } = this.props;
    if (!confirmAdd) {
      return null;
    }
    return (
      <Modal className={styles.confirmAddModal}>
        <header>{JSON.stringify(confirmAdd)}</header>
        <main />
        <footer>
          <button onClick={() => onAddSong(confirmAdd.songId)}>Add</button>
          <button onClick={() => this.cancelAdd()}>Cancel</button>
        </footer>
      </Modal>
    );
  }

  renderResults() {
    if (!this.state.showResults || !this.state.value) return null;
    const byResultType = (song) => song.resultType;
    const results = partitionArray(this.props.autoCompleteResults || [], byResultType);
    return <ResultsPreview results={results} />;
  }

  render() {
    return (
      <main>
        <H3>Add Song To Playlist</H3>
        <Form onSubmit={(data) => this.fullSearch(data)}>
          <div className={styles.searchBox}>
            <TextInput
              name="searchText"
              value={this.state.value}
              onChange={(value) => this.changeSearchText(value)}
              onFocus={() => this.setState({ showResults: true })}
              onBlur={() => this.setState({ showResults: false })}
            />
            <Button submittable>Search</Button>
          </div>

          <div>
            <InputGroup value="exact" name="searchMode">
              <RadioButton checkedValue="exact">Exact</RadioButton>
              <RadioButton defaultSelected checkedValue="startsWith">
                Starts With
              </RadioButton>
            </InputGroup>
          </div>
          {this.renderResults()}
        </Form>
        <section>
          <FullResults onAdd={this.onAddSong.bind(this)} results={this.props.searchResults} />
        </section>
        {this.renderConfirmModal()}
      </main>
    );
  }
}

export default PlaylistManager;
