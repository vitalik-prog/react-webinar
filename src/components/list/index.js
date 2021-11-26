import React from "react";
import propTypes from 'prop-types';
import Item from "../item";
import './styles.css';

function List({items, onSelectItem, onAddItemToCart}) {
  console.log('List');
  return (
    <div className='List'>{items.map((item, index) =>
      <div className='List__item' key={item.code}>
        <Item
          item={item}
          index={index}
          onSelect={onSelectItem}
          onAddToCart={onAddItemToCart}
          rightContent={item.count
            ? <div className='Item__count'>{item.count} шт</div>
            : <button onClick={() => onAddItemToCart(item.code)}>
                Добавить
              </button>
          }
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onSelectItem: propTypes.func,
  onAddItemToCart: propTypes.func
}

List.defaultProps = {
  items: [],
  onAddItemToCart: () => {},
  onSelectItem: () => {}
}

export default React.memo(List);