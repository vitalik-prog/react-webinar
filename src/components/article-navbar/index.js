import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "../navbar";
import './styles.css';

const ArticleNavbar = (props) => {
  return (
    <Navbar>
      <Link to={`/articles/create/`}>Создать</Link>
      <Link to={`/articles/edit/${props.articleId}`}>Редактировать</Link>
      <Link to={`/`} onClick={() => props.onDelete(props.articleId)}>Удалить</Link>
    </Navbar>
  );
};

export default React.memo(ArticleNavbar);
