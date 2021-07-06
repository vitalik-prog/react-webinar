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

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(
  React.createElement(Provider, {store},
    React.createElement(App)
  ),
  document.getElementById("app")
);