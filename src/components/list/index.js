import React from "react";
import Item from "../item";
import './styles.css';

function List({store}){
  return (
    <div className='List'>{store.getState().items.map(item =>
      <div className={'List__item' + (item.selected ? ' List__item_selected' : '')} key={item.code}>
        <Item store={store} item={item}/>
      </div>
    )}
    </div>
  )
}

export default List;