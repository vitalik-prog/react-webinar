import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import numberFormat from "../../utils/number-format";

function Item({item, onAdd, onSelect}) {
  const handleAddToBasket = (e) => {
    e.stopPropagation();
    onAdd(item._id)
  }
  return (
    <div className='Item' onClick={onSelect}>
      <div className='Item__number'>{item._key}</div>
      <div className='Item__title'>{item.title}</div>
      <div className='Item__right'>
        <div className='Item__price'>{numberFormat(item.price)} ₽</div>
        <button onClick={handleAddToBasket}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onSelect: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
  onSelect: () => {},
}

export default React.memo(Item);
