import React from 'react';
import combineClasses from 'classnames';
import MenuTitle from '../MenuTitle';
import Submenu from '../Submenu';

import styles from './index.css';

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: typeof props.defaultOpen === 'boolean' ? props.defaultOpen : props.open
    };
  }

  get isControlled() {
    return typeof this.props.open === 'boolean';
  }

  componentWillReceiveProps(newProps) {
    if (typeof newProps.open === 'boolean') {
      this.setState({
        open: newProps.open
      });
    }
  }

  close() {
    const { open } = this.state;
    if (open) {
      this.toggle();
    }
  }

  toggle() {
    let { open } = this.state;
    if (!this.isControlled) {
      open = !open;
    }
    this.setState({ open }, () => {
      this.props.onToggle(open);
    });
  }

  render() {
    const { className, children, rightAlign } = this.props;
    const { open } = this.state;
    const combinedClasses = combineClasses(styles.dropDownMenu, className);
    const childArray = React.Children.toArray(children);
    const titleChild = childArray.find((child) => child.type === MenuTitle);
    const submenuChild = childArray.find((child) => child.type === Submenu);
    const title = titleChild;
    const submenu = React.cloneElement(submenuChild, {
      key: 'submenu',
      className: combineClasses(submenuChild.props.className, styles.menuItems, {
        [styles.open]: open,
        [styles.right]: rightAlign
      })
    });
    return (
      <div
        className={combinedClasses}
        onClick={() => this.toggle()}
        onMouseLeave={() => this.close()}
      >
        {title}
        {submenu}
        {/* <menu className={styles.menuItems}>{children}</menu> */}
      </div>
    );
  }
}

export default DropDownMenu;
