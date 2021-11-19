import React from "react";
import ReactDOM from "react-dom";
import Store from "./store/store.js";
import App from "./app.js";

const root = document.getElementById("app");

// Состояние приложения
const store = new Store({
  items: [
    { code: 1, title: "Название элемента", clickCount: 0 },
    { code: 2, title: "Некий объект", clickCount: 0 },
    { code: 3, title: "Заголовок", clickCount: 0 },
    { code: 4, title: "Короткое название", clickCount: 0 },
    { code: 5, title: "Запись", clickCount: 0 },
    { code: 6, title: "Пример названия", clickCount: 0 },
    { code: 7, title: "Седьмой", clickCount: 0 },
  ],
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(
    <App
      items={store.getState().items}
      dispatch={store.dispatch.bind(store)}
    />,
    root
  );
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(
  <App items={store.getState().items} dispatch={store.dispatch.bind(store)} />,
  root
);
