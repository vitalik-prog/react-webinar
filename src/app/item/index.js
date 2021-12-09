import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router-dom";
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
    loading: state.item.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const { id } = useParams();
  const store = useStore();

  useEffect(async () => {
    await store.item.loadItem(id);

    return () => store.item.resetState()
  }, [id]);

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }

  const renders = {
    navbar: useCallback(() => <Navbar />, []),
  }

  if (select.loading) {
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
