import React, {useCallback} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStoreState from "../../utils/use-store-state";

function Main({store}) {
  console.log('Main');

  const state = useStoreState(store);

  const callbacks = {
    addToBasket: useCallback((code) => store.addToBasket(code), [store]),
    openModal: useCallback(() => store.openModal('basket'), [store]),
  }

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={state.basket.amount} sum={state.basket.sum}/>
      <List items={state.items} renderItem={renders.item}/>
    </Layout>
  );
}

export default React.memo(Main);