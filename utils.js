/**
 * Компонент React, реагирует на изменения store для обновления внутреннего состояния и тем самым
 * заставляя React перерендерить его и вложенные компоненты.
 */
function Provider({store, children}){
  // Внутренне состояние компонента и метод его установки
  // Если состояние изменить, то React обновит компонент
  const [state, setState] = React.useState(store.getState());

  // Подписка на изменение store после первого рендера компонента
  React.useEffect(() => {
    store.subscribe( state => setState(state))
  }, []);

  // Рендер вложенных компонентов с передачей им store
  return React.Children.map(children, child => React.cloneElement(child, {store}));
}