import React, {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Header from "../../containers/header";
import useSelector from "../../utils/use-selector";
import useInit from "../../utils/use-init";
import useStore from "../../utils/use-store";
import Layout from "../../components/layout";
import ConfigureArticleForm from "../../components/configure-article-form";
import Spinner from "../../components/spinner";

const EditArticle = () => {
  const params = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    article: state.article.data,
    countries: state.article.countries,
    categories: state.categories.categories,
    validationErrors: state.article.validationErrors,
    waitingArticle: state.article.waiting,
    waitingCategories: state.categories.waiting,
  }));

  //Начальная загрузка
  useInit(async () => {
    if (!Object.keys(select.article).length) {
      await store.get('article').load(params.articleId);
    }
    if (!Object.keys(select.countries).length) {
      await store.get('article').getCountries();
    }
    if (!select.categories.length) {
      await store.categories.getCategories();
    }
  }, [params.articleId], {backForward: true});

  const callbacks = {
    onArticleUpdate: useCallback((article) => store.get('article').update(article), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waitingArticle || select.waitingCategories}>
        <ConfigureArticleForm
          article={select.article}
          countries={select.countries}
          categories={select.categories}
          onSubmit={callbacks.onArticleUpdate}
          isSubmitDisabled={select.waitingArticle}
          validationErrors={select.validationErrors}
        />
      </Spinner>
    </Layout>
  );
};

export default React.memo(EditArticle);
