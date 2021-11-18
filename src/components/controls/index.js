import React from "react";
import './styles.css';

function Controls({store}){
  return <div className='Controls'>
    <button onClick={() => store.createItem()}> Добавить</button>
  </div>
}

export default Controls;