import React from 'react';
import './styles.css';
import propTypes from "prop-types";

const TotalRow = ({ totalProductsCount, totalProductsPrice }) => {

  return (
    <div className='Total__row'>
      <strong>Итого</strong>
      <div className='Total__row_price'><strong>{totalProductsPrice.toLocaleString('ru')} &#8381;</strong></div>
      <div className='Total__row_count'><strong>{totalProductsCount} шт</strong></div>
    </div>
  );
};

TotalRow.propTypes = {
  totalProductsCount: propTypes.number,
  totalProductsPrice: propTypes.number
}

TotalRow.defaultProps = {
  totalProductsCount: 0,
  totalProductsPrice: 0
}

export default TotalRow;
