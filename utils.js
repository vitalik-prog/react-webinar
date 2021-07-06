/**
 * Провайдер изменений в store
 * Компонент React, реагирует на изменения store для обновления внутреннего состояния и тем самым
 * заставляя React перерендерить его и вложенные компоненты.
 */
function Provider({store, children}) {
  // Применим внутреннее состояние компонента.
  // Изменяя состояние заставим React перерендерить компонент.
  const [state, setState] = React.useState();
  //
  // // Подписка на изменение store
  React.useEffect(() => {
    return store.subscribe(newState => setState(newState));
  }, []);

  // Рендер вложенных компонентов с передачей им store
  return React.Children.map(children, child => React.cloneElement(child, {store}));
}