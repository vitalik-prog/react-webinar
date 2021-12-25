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
    countries: state.countries.countries,
    categories: state.categories.categories,
    validationErrors: state.article.validationErrors,
    waitingArticle: state.article.waiting,
    waitingCategories: state.categories.waiting,
    waitingCountries: state.countries.waiting,
  }));

  //Начальная загрузка
  useInit(() => {
    Promise.all([
      store.get('article').load(params.articleId),
      store.countries.load(),
      store.categories.load()
    ]).then();
  }, [params.articleId]);

  useEffect(() => {
    return () => store.get('article').resetErrors()
  }, [])

  const callbacks = {
    onArticleUpdate: useCallback((article) => store.get('article').update(article), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waitingArticle || select.waitingCategories || select.waitingCountries}>
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
