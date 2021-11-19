import React from "react";
import "./style.css";
import {
  createItemActionCreator,
  deleteItemActionCreator,
  selectItemActionCreator,
} from "./store/actionCreators";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ items, dispatch }) {
  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
        <button onClick={() => dispatch(createItemActionCreator())}>
          {" "}
          Добавить
        </button>
      </div>
      <div className="App__center">
        <div className="List">
          {items.map((item) => (
            <div
              key={item.code}
              className={
                "List__item" + (item.selected ? " List__item_selected" : "")
              }
            >
              <div
                className="Item"
                onClick={() => dispatch(selectItemActionCreator(item.code))}
              >
                <div className="Item__number">{item.code}</div>
                <div className="Item__title">
                  {item.title}
                  {item.clickCount > 0 && (
                    <span> | Выделялся {item.clickCount} раз</span>
                  )}
                </div>
                <div className="Item__actions">
                  <button
                    onClick={() => dispatch(deleteItemActionCreator(item.code))}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
