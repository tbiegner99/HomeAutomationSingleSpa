import React from 'react';
import combineClasses from 'classnames';
import styles from './placeHolderListItem.css';

const ItemInfo = (props) => {
  const { title } = props;
  return (
    <div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

const ListItem = (props) => {
  const { title, onClick } = props;
  const clickable = typeof onClick === 'function';
  return (
    <div
      className={combineClasses(styles.listItem, { [styles.clickable]: clickable })}
      onClick={onClick}
    >
      <ItemInfo title={title} />
    </div>
  );
};

export default ListItem;
