import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function ItemDetails({item, onAdd}) {
  return (
    <div className='ItemDetails'>
      <div>{item.description}</div>
      <div>Страна производитель: <strong>{item.maidIn.title} ({item.maidIn.code})</strong></div>
      <div>Категория: <strong>{item.category.title}</strong></div>
      <div>Год выпуска: <strong>{item.edition}</strong></div>
      <div className='ItemDetails__price'><strong>Цена: {numberFormat(item.price)} ₽</strong></div>
      <button onClick={() => onAdd(item._id)}>Добавить</button>
    </div>
  )
}

ItemDetails.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ItemDetails.defaultProps = {
  item: null,
  onAdd: () => {}
}

export default React.memo(ItemDetails);
