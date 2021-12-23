import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Article from "./article";
import EditArticle from "./edit-article";
import CreateArticle from "./create-article";

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/articles/edit/:articleId"} element={<EditArticle/>}/>
        <Route path={"/articles/create"} element={<CreateArticle/>}/>
      </Routes>
      {select.name === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
