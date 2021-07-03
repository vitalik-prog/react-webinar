// Состояние приложения
const store = new Store({
  items: [
    {code: 1, title: 'Название элемента'},
    {code: 2, title: 'Некий объект'},
    {code: 3, title: 'Заголовок'},
    {code: 4, title: 'Короткое название'},
    {code: 5, title: 'Запись'},
    {code: 6, title: 'Пример названия'},
    {code: 7, title: 'Седьмой'},
  ]
});


// Элемент в документе, куда рендерить приложение
const root = document.getElementById("app");

/**
 * Компонент React, который реагирует на изменения store для перерисовки
 * @param store
 * @param children
 * @return {*}
 * @constructor
 */
function StoreProvider({store, children}){
  // Внутренне состояние компонента и метод его установки
  // Если состояние изменить, то React обновит компонент
  const [state, setState] = React.useState(store.getState());

  // Подписка на изменение store после первого рендера компонента
  React.useEffect(() => {
    store.subscribe( state => setState(state))
  }, []);

  // Рендер вложенных компонентов с передачей им store
  return React.createElement(children, {store});
}

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(
  React.createElement(StoreProvider, {store}, App),
  root
);