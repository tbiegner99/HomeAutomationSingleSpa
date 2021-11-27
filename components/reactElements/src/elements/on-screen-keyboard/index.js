import React from 'react';
import combineClasses from 'classnames';
import styles from './index.css';
import { BackspaceIcon, CapsIcon } from './Icons';
import { lettersLayout, symbolsLayout, symbolsPage2Layout, SpecialKeys } from './KeyboardLayouts';

const Key = (props) => {
  const { char, className, onKeyPress } = props;
  return (
    <div className={combineClasses(className, styles.key)}>
      <div onClick={onKeyPress} className={styles.keyContent}>
        {char}
      </div>
    </div>
  );
};

class OnScreenKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getLayout(symbolsPage) {
    switch (symbolsPage) {
      case 1:
        return symbolsLayout;
      case 2:
        return symbolsPage2Layout;
      default:
        return lettersLayout;
    }
  }

  toggleCaps() {
    const { isCaps } = this.state;
    this.setState({ isCaps: !isCaps, symbolsPage: 0 });
  }

  toggleSymbolsPage(page) {
    this.setState({ symbolsPage: page });
  }

  renderMoreSymbols() {
    return <Key char={SpecialKeys.MORE_SYMBOLS} onKeyPress={() => this.toggleSymbolsPage(2)} />;
  }

  renderLessSymbols() {
    return <Key char={SpecialKeys.LESS_SYMBOLS} onKeyPress={() => this.toggleSymbolsPage(1)} />;
  }

  renderLettersKey() {
    return <Key char={SpecialKeys.LETTERS} onKeyPress={() => this.toggleSymbolsPage(0)} />;
  }

  renderSpaceKey() {
    const { onKeyPress } = this.props;
    const SPACE_CHAR = ' ';
    return (
      <Key
        className={styles.spacebar}
        char={SPACE_CHAR}
        onKeyPress={() => onKeyPress(SPACE_CHAR)}
      />
    );
  }

  renderSymbolKey() {
    return <Key char="!@#$" onKeyPress={() => this.toggleSymbolsPage(1)} />;
  }

  renderEnterKey() {
    const { onEnterPress } = this.props;
    return <Key char="Enter" onKeyPress={onEnterPress} />;
  }

  renderBackspaceKey() {
    const { onBackspacePress } = this.props;
    const icon = <BackspaceIcon />;
    return <Key char={icon} onKeyPress={onBackspacePress} />;
  }

  renderCapsKey() {
    const { isCaps } = this.state;
    const icon = <CapsIcon />;
    const classname = isCaps ? styles.toggled : null;

    return <Key char={icon} className={classname} onKeyPress={this.toggleCaps.bind(this)} />;
  }

  renderRegularKey(key) {
    const { onKeyPress } = this.props;
    const { isCaps } = this.state;
    const char = isCaps ? key.toUpperCase() : key.toLowerCase();
    return <Key char={char} onKeyPress={() => onKeyPress(char)} />;
  }

  renderKey(key) {
    switch (key) {
      case SpecialKeys.GO:
        return this.renderEnterKey();
      case SpecialKeys.SPACE:
        return this.renderSpaceKey();
      case SpecialKeys.CAPS:
        return this.renderCapsKey();
      case SpecialKeys.BACKSPACE:
        return this.renderBackspaceKey();
      case SpecialKeys.SYMBOLS:
        return this.renderSymbolKey();
      case SpecialKeys.MORE_SYMBOLS:
        return this.renderMoreSymbols();
      case SpecialKeys.LESS_SYMBOLS:
        return this.renderLessSymbols();
      case SpecialKeys.LETTERS:
        return this.renderLettersKey();

      default:
        return this.renderRegularKey(key);
    }
  }

  renderRow(row) {
    return <div className={styles.row}>{row.map(this.renderKey.bind(this))}</div>;
  }

  render() {
    const { symbolsPage } = this.state;
    const layout = this.getLayout(symbolsPage);
    return (
      <div
        onMouseDown={(e) => e.preventDefault()}
        className={combineClasses(styles.keyboard, '__onScreenKeyboard')}
      >
        {layout.map(this.renderRow.bind(this))}
      </div>
    );
  }
}

export default OnScreenKeyboard;
