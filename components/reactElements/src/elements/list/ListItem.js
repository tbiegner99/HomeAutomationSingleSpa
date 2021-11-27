import React from 'react';
import combineClasses from 'classnames';
import { DeleteIcon, MoveUpIcon, MoveDownIcon } from '../../icons/Icons';
import styles from './listItem.css';

const renderMoveUpIcon = (props) => {
  const { item, onMoveUp, canMoveUp } = props;
  if (!canMoveUp) return null;
  return <MoveUpIcon onClick={() => onMoveUp(item)} className={styles.actionIcon} />;
};
const renderMoveDownIcon = (props) => {
  const { item, onMoveDown, canMoveDown } = props;
  if (!canMoveDown) return null;
  return <MoveDownIcon onClick={() => onMoveDown(item)} className={styles.actionIcon} />;
};

const ItemInfo = (props) => {
  const { title, subtitle } = props;
  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

const ItemActions = (props) => {
  const { onDelete } = props;
  return (
    <div>
      {renderMoveUpIcon(props)}
      {renderMoveDownIcon(props)}
      <DeleteIcon
        onClick={onDelete}
        className={combineClasses(styles.actionIcon, styles.deleteIcon)}
      />
    </div>
  );
};

const ListItem = (props) => {
  const {
    title,
    subtitle,
    onClick,
    onDelete,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown
  } = props;
  const clickable = typeof onClick === 'function';
  return (
    <div
      className={combineClasses(styles.listItem, { [styles.clickable]: clickable })}
      onClick={onClick}
    >
      <ItemInfo title={title} subtitle={subtitle} />
      <ItemActions
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
      />
    </div>
  );
};

export default ListItem;
