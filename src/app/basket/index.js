import React, {useCallback} from "react";
import List from "../../components/list";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStoreState from "../../utils/use-store-state";

function Basket({store}){
  console.log('Basket');

  const state = useStoreState(store);

  const callbacks = {
    closeModal: useCallback(() => store.closeModal(), [store]),
  }

  const renders = {
    itemBasket: useCallback(item => {
      return <ItemBasket item={item}/>
    }, [])
  }

  return (
    <LayoutModal title={'Корзина'} onClose={callbacks.closeModal}>
      <List items={state.basket.items} renderItem={renders.itemBasket}/>
      <BasketTotal amount={state.basket.amount} sum={state.basket.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);