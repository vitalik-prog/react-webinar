import React, {useCallback, useMemo} from 'react';
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
    countries: state.article.countries,
    categories: state.categories.categories,
    validationErrors: state.article.validationErrors,
    waitingArticle: state.article.waiting,
    waitingCategories: state.categories.waiting,
  }));

  //Начальная загрузка
  useInit(async () => {
    if (Object.keys(select.countries).length === 0) {
      await store.get('article').getCountries();
    }
    if (!select.categories.length) {
      await store.categories.getCategories();
    }
  }, []);

  const callbacks = {
    onArticleCreate: useCallback((article) => {
      store.get('article').create(article)
      navigate('/')
    }, [store]),
  }

  // Опции для полей
  const options = {
    countries: useMemo(() => ([
      {value:'', title: '  -'},
      ...select.countries
    ]), [select.countries]),
    categories: useMemo(() => ([
      {value:'', title: '  -'},
      ...select.categories
    ]), [select.categories]),
  }

  return (
    <Layout>
      <Header/>
      <Spinner active={select.waitingArticle || select.waitingCategories}>
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
