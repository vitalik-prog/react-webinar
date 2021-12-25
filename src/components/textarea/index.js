import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';

function Textarea(props) {

  // CSS классы по БЭМ
  const className = cn('Textarea');

  return (
    <textarea
      className={className()}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      rows={props.rows}
    />
  )
}

Textarea.propTypes = {
  value: propTypes.string,
  rows: propTypes.number,
  onChange: propTypes.func,
}

Textarea.defaultProps = {
  onChange: () => {},
  rows: 5,
  value: ''
}

export default React.memo(Textarea);
