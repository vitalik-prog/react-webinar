import React, {useCallback, useState} from "react";
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './styles.css';

function Item({item, index, onSelect, rightContent}){
  console.log('Item', item.title);

  const [counter, setCounter] = useState(0);

  const callbacks = {
    onClick: useCallback(() => {
      // onSelect(item.code);
      // if (!item.selected){
        setCounter(counter + 1);
      // }
    }, [item, onSelect, counter, setCounter])
  };

  return (
    <div className={'Item'  + (item.selected ? ' Item_selected' : '')} onClick={callbacks.onClick}>
      <div className='Item__number'>{item.count ? index + 1 : item.code}</div>
      <div className='Item__title'>
        {item.title}
        {counter ? ` | Выделялся ${counter} ${plural(counter, 'раз', 'раза', 'раз')}` : null}
      </div>
      <div className='Item__actions'>
        <div className='Item__price'>
          {Number.parseInt(item.price).toLocaleString('ru')}
          <span>&nbsp;</span>
          &#8381;
        </div>
        {rightContent}
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number,
  onSelect: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
}

export default React.memo(Item);