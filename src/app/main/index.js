import React, {useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";

function Main() {
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItemsCount: state.catalog.totalItemsCount,
    activePage: state.catalog.activePage,
    isLoading: state.loaders,
    loading: state.catalog.loading
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(select.activePage);
  }, []);

  const store = useStore();
  let navigate = useNavigate();

  const callbacks = {
    addToBasket: useCallback((_id) => {store.basket.add(_id)}, [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    handlePageChange: useCallback((pageNumber) => store.catalog.load(pageNumber), [store]),
  }

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket} onSelect={() => navigate(`/items/${item._id}`)}/>
    }, [callbacks.addToBasket]),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModal}
        amount={select.amount}
        sum={select.sum}
      />
      {select.loading
        ? <Loader />
        : <List
        items={select.items}
        renderItem={renders.item}
      />}
      <Pagination
        onPageChange={callbacks.handlePageChange}
        totalItemsCount={select.totalItemsCount}
        activePage={select.activePage}
      />
    </Layout>
  );
}

export default React.memo(Main);
