import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Item from "./item";

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main/>} />
        <Route path={"/:id"} element={<Item />} />
        <Route path={'*'} element={<Navigate replace to="/" />} />} />
      </Routes>
      {select.name === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
