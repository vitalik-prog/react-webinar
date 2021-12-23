import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';

function Select(props){

  // CSS классы по БЭМ
  const className = cn('Select');
  const onSelect = useCallback((e) => {
    props.onChange(e);
  }, [props.onChange])

  return (
    <select name={props.name} className={className()} onChange={onSelect} value={props.value}>
      {props.options.map((item, index) => (
        <option key={index} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  name: propTypes.string
}

Select.defaultProps = {
  onChange: () => {
  },
  name: 'select'
}

export default React.memo(Select);
