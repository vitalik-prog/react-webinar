import React, {useCallback, useEffect} from "react";
import { useParams, NavLink } from "react-router-dom";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Navbar from "../../components/navbar";
import ItemDetails from "../../components/item-details";
import Loader from "../../components/loader";

function Item() {

  const select = useSelector(state => ({
    item: state.item.item,
    isLoading: state.loaders,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  let { id } = useParams();

  useEffect(async () => {
    await store.item.loadItem(id);
  }, [id]);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }

  const renders = {
    navbar: useCallback(() => <Navbar />, []),
  }

  if (select.isLoading.name === 'item' && select.isLoading.status) {
    return <Layout><Loader /></Layout>
  }

  return (
    <>
      {select.item &&
        <Layout head={<h1>{select.item.title}</h1>}>
          <BasketSimple
            onOpen={callbacks.openModal}
            amount={select.amount}
            sum={select.sum}
            renderNavbar={renders.navbar}
          />
          <ItemDetails item={select.item} onAdd={callbacks.addToBasket} />
        </Layout>
      }
    </>
  );
}

export default React.memo(Item);
