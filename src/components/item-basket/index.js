import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function ItemBasket({item, onSelect}) {
  return (
    <div onClick={onSelect} className='ItemBasket'>
      <div className='ItemBasket__number'>{item._key}</div>
      <div className='ItemBasket__title'>{item.title}</div>
      <div className='ItemBasket__right'>
        <span className="ItemBasket__cell">{numberFormat(item.price || 0)} ₽</span>
        <span className="ItemBasket__cell">{numberFormat(item.amount || 0)} шт</span>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func
}

ItemBasket.defaultProps = {
  onSelect: () => {}
}

export default React.memo(ItemBasket);
