import React, {useCallback, useEffect, useMemo} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../containers/header";
import useSelector from "../../utils/use-selector";
import useInit from "../../utils/use-init";
import useStore from "../../utils/use-store";
import Layout from "../../components/layout";
import ConfigureArticleForm from "../../components/configure-article-form";
import Spinner from "../../components/spinner";

const CreateArticle = () => {
  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    article: state.article.data,
    countries: state.countries.countries,
    categories: state.categories.categories,
    validationErrors: state.article.validationErrors,
    waitingCategories: state.categories.waiting,
    waitingCountries: state.countries.waiting,
  }));

  //Начальная загрузка
  useInit(() => {
    Promise.all([
      store.countries.load(),
      store.categories.load()
    ]).then();
  }, []);

  useEffect(() => {
    return () => store.get('article').resetErrors()
  }, [])

  const callbacks = {
    onArticleCreate: useCallback(async (article) => {
      const id = await store.get('article').create(article)
      if (id) {
        navigate(`/articles/${id}`)
      }
    }, [store, select.article]),
  }

  // Опции для полей
  const options = {
    countries: useMemo(() => ([
      {value: '', title: '  -'},
      ...select.countries
    ]), [select.countries]),
    categories: useMemo(() => ([
      {value: '', title: '  -'},
      ...select.categories
    ]), [select.categories]),
  }

  return (
    <Layout head={<h1>Создание товара</h1>}>
      <Header/>
      <Spinner active={select.waitingCategories || select.waitingCountries}>
        <ConfigureArticleForm
          countries={options.countries}
          categories={options.categories}
          onSubmit={callbacks.onArticleCreate}
          isSubmitDisabled={select.waitingArticle}
          validationErrors={select.validationErrors}
        />
      </Spinner>
    </Layout>
  );
};

export default React.memo(CreateArticle);
