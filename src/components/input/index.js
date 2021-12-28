import React, {useCallback, useEffect, useMemo, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';
import {useDebounce} from "../../utils/use-debaunce";

function Input(props) {

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);
  const debouncedValue = useDebounce(value, 1500);

  useEffect(() => {
    props.onChange(debouncedValue)
  }, [debouncedValue]);

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    change(event.target.value);
  }, [change]);

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
