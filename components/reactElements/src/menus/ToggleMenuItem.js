import React from 'react';
import combineClasses from 'classnames';
import MenuItem from './MenuItem';

import styles from './menuItem.css';

class ToggleMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultSelected || false
    };
  }

  async onToggle() {
    const newValue = !this.state.selected;
    try {
      await this.props.onToggle(newValue);
      this.setState({
        selected: newValue
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { className, onClick, ...otherProps } = this.props;
    const classNames = combineClasses(styles.toggleItem, className);
    return (
      <MenuItem
        selected={this.state.selected}
        className={classNames}
        onClick={() => this.onToggle()}
        {...otherProps}
      >
        {this.props.children}
      </MenuItem>
    );
  }
}

export default ToggleMenuItem;
