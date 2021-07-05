import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store.js';
import {Provider} from './utils.js';
import App from './app.js';

// Состояние приложения
const store = new Store({
  items: [
    {code: 1, title: 'Название элемента'},
    {code: 2, title: 'Некий объект'},
    {code: 3, title: 'Заголовок'},
    {code: 4, title: 'Короткое название'},
    {code: 5, title: 'Запись'},
    {code: 6, title: 'Пример названия'},
    {code: 7, title: 'Седьмой'}
  ]
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app") // Элемент в документе, куда рендерить приложение
);







