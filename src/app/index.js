import React from 'react';
import Main from "./main";
import Basket from "./basket";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {

  console.log('App', store);

  // Применим внутреннее состояние компонента, чтобы управлять перепендером компонента
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    return store.subscribe(newState => {
      setState(newState)
    });
  }, []);

  return (
    <>
      <Main store={store}/>
      {state.modals.name === 'basket' && <Basket store={store}/>}
    </>
  );
}

export default React.memo(App);