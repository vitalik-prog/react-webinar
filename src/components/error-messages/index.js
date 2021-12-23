import React from 'react';
import './styles.css';

const ErrorMessages = ({ errors }) => {
  return (
    <>
      {errors && errors.map((error, index) =>
        <div className={'Error-Wrapper'} key={index}>{error.message}</div>
      )}
    </>
  );
};

export default ErrorMessages;
