import React from 'react';
import Main from "./main";
import Basket from "./basket";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {

  console.log('App');

  const state = store.getState();

  return (
    <>
      <Main store={store}/>
      {state.modals.name === 'basket' && <Basket store={store}/>}
    </>
  );
}

export default React.memo(App);