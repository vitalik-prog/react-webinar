// Элемент в документе, куда рендерить приложение
const root = document.getElementById("app");

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

// Реакция на изменение store - заново рендерим приложение
store.subscribe(() => {
  render(root, App({store}))
});

// Первый рендер рендер (один раз)
render(root, App({store}));

