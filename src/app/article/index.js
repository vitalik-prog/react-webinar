import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import ArticleNavbar from "../../components/article-navbar";

function Article() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();

  // Начальная загрузка
  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id], {backForward: true});

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    handleDelete: useCallback((_id) => store.get('article').delete(_id), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <ArticleNavbar articleId={select.article._id} onDelete={callbacks.handleDelete} />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket}/>
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
