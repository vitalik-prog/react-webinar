import React, {useCallback, useEffect, useMemo, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';
import throttle from "lodash.throttle";
import debounce from 'lodash.debounce';

function Input(props) {

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  // const changeThrottle = useCallback(throttle(value => {
  //   console.log(value)
  //   props.onChange(value)
  //   }, 1000)
  // , []);

  const changeThrottle = useMemo(() => debounce(value => props.onChange(value), 1000), [props.onChange]);

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    change(event.target.value);
    if (props.isThrottling) {
      changeThrottle(event.target.value);
    }
  }, [change, changeThrottle]);

  // Обновление стейта, если передан новый value
  useEffect(() => {
    change(props.value);
  }, [props.value]);

  // CSS классы по БЭМ
  const className = cn('Input');

  return (
    <input
      className={className({theme: props.theme})}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

Input.propTypes = {
  value: propTypes.any,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
  isThrottling: propTypes.bool
}

Input.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: '',
  isThrottling: false
}

export default React.memo(Input);
