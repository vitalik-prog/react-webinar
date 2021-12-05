import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  const select = useSelector(store, (state) => ({
    name: state.modals.name
  }));

  return (
    <>
      <Main store={store}/>
      {select.name === 'basket' && <Basket store={store}/>}
    </>
  );
}

export default React.memo(App);