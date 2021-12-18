import React, {useCallback, useEffect, useMemo} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import Select from "../../components/select";

function Main() {

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    sort: state.catalog.params.sort,
    waiting: state.catalog.waiting,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load();
  }, []);

  const store = useStore();

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'key', title: 'По коду'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  }

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    onPaginate: useCallback(page => store.catalog.load({page}), [store]),
    onSort: useCallback(sort => store.catalog.load({sort}), [store]),
  }

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`}/>
    }, [callbacks.addToBasket]),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Header />
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Spinner active={select.waiting}>
        <List items={select.items} renderItem={renders.item}/>
      </Spinner>
      <Pagination
        page={select.page}
        limit={select.limit}
        count={select.count}
        onChange={callbacks.onPaginate}
      />
    </Layout>
  );
}

export default React.memo(Main);
