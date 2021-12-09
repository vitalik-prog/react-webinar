import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import {usePagination} from "../../utils/use-pagination";

function Pagination(props) {
  const pagesNumbers = usePagination(props.totalItemsCount, props.activePage)

  return (
    <div className='Pagination'>
      {pagesNumbers.map(number =>
        <button
          onClick={() => props.onPageChange(number)}
          className={number === props.activePage ? 'active' : undefined}
          key={number}>
          {number}
        </button>
      )}
    </div>
  )
}

Pagination.propTypes = {
  totalItemsCount: propTypes.number.isRequired,
  activePage: propTypes.number.isRequired,
  onPageChange: propTypes.func
}

Pagination.defaultProps = {
  totalItemsCount: 0,
  activePage: 1,
  onPageChange: () => {}
}

export default React.memo(Pagination);
