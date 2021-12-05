import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useStoreState from "../utils/use-store-state";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  const state = useStoreState(store);

  return (
    <>
      <Main store={store}/>
      {state.modals.name === 'basket' && <Basket store={store}/>}
    </>
  );
}

export default React.memo(App);