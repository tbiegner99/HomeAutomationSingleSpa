import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as FormTextInput } from '@tbiegner99/react-forms';
import OnScreenKeyboard from '../elements/on-screen-keyboard';

class TextInput extends React.Component {
  static contextTypes = { rootForm: PropTypes.object };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      value: props.defaultValue || props.value || ''
    };
  }

  onKeyPress(key) {
    const { value } = this.state;
    const { onChange } = this.props;
    this.setState({ value: value + key });
    if (typeof onChange === 'function') {
      onChange(this.state.value);
    }
  }

  onBackspacePress() {
    const { value } = this.state;
    const { onChange } = this.props;
    let { selectionStart, selectionEnd } = this.refs.input;

    if (selectionStart === selectionEnd) {
      if (selectionStart === 0) {
        return;
      }
      selectionStart--;
    }

    const newValue =
      value.substring(0, selectionStart) + value.substring(selectionEnd, value.length);

    this.setState({ value: newValue });
    if (typeof onChange === 'function') {
      onChange(this.state.value);
    }
  }

  onEnterPress() {
    const { onEnterPress } = this.props;
    const { rootForm } = this.context;
    this.refs.input.blur();
    if (typeof onEnterPress === 'function') {
      onEnterPress(this.state.value);
    }
    if (rootForm) {
      rootForm.submit();
    }
    this.setState({ isFocused: false });
  }

  get inputComponent() {
    return FormTextInput;
  }

  getInputValue() {
    return this.state.value;
  }

  handleFocus(e) {
    this.setState({ isFocused: true });
    if (typeof this.props.onFocusChange === 'function') {
      this.props.onFocusChange(true, e);
    }
  }

  handleBlur(e) {
    this.setState({ isFocused: false });
    if (typeof this.props.onFocusChange === 'function') {
      this.props.onFocusChange(false, e);
    }
  }

  handleChange(value) {
    this.setState({ value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  }

  shouldRenderOnScreenKeyboard() {
    const { isFocused } = this.state;
    return isFocused;
  }

  renderOnScreenKeyboard() {
    if (this.shouldRenderOnScreenKeyboard()) {
      return (
        <OnScreenKeyboard
          onKeyPress={this.onKeyPress.bind(this)}
          onBackspacePress={this.onBackspacePress.bind(this)}
          onEnterPress={this.onEnterPress.bind(this)}
        />
      );
    }
    return null;
  }

  render() {
    const InputComponent = this.inputComponent;
    return (
      <div onFocus={(evt) => this.handleFocus(evt)} onBlur={(evt) => this.handleBlur(evt)}>
        {this.renderOnScreenKeyboard()}
        <InputComponent
          ref="input"
          {...this.props}
          onChange={this.handleChange.bind(this)}
          value={this.getInputValue()}
        />
      </div>
    );
  }
}

export default TextInput;
