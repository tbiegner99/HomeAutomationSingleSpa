class SongsSerializer {
  toSearchRequest(searchText, options, searchType) {
    return {
      searchMode: searchType,
      query: searchText,
      resultType: options.resultType,
      exact: options.searchMode === 'exact'
    };
  }

  fromSearchResult(item) {
    return {
      songId: item.id,
      title: item.title,
      artist: item.artist,
      source: item.source,
      resultType: item.resultType
    };
  }

  fromFullSearchResults(results) {
    const ret = {};
    results.forEach((result) => {
      const artist = ret[result.artist] || {};
      const title = artist[result.title] || {};
      const sources = title.sources || [];
      sources.push({
        songId: result.id,
        source: result.source
      });
      title.sources = sources;
      artist[result.title] = title;
      ret[result.artist] = artist;
    });
    return ret;
  }
}

export default new SongsSerializer();
