import React from "react";
import propTypes from 'prop-types';
import './styles.css';

function Item({item, onSelect, onDelete}){
  console.log('Item', item.title);
  return (
    <div className={'Item'  + (item.selected ? ' Item_selected' : '')} onClick={() => onSelect(item.code)}>
      <div className='Item__number'>{item.code}</div>
      <div className='Item__title'>{item.title}</div>
      <div className='Item__actions'>
        <button onClick={() => onDelete(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);