import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import LayoutModal from "./components/layout-modal";
import Item from "./components/item";
import ItemBasket from "./components/item-basket";
import BasketSimple from "./components/basket-simple";
import BasketTotal from "./components/basket-total";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  const [modalVisible, setModalVisible] = useState(false);

  const callbacks = {
    openModal: useCallback(() => setModalVisible(true), [setModalVisible]),
    closeModal: useCallback(() => setModalVisible(false), [setModalVisible]),
    addToBasket: useCallback((code) => {}, []),
  }

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),

    itemBasket: useCallback(item => {
      return <ItemBasket item={item}/>
    }, [])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={10} sum={8800}/>
        <List items={store.getState().items} renderItem={renders.item}/>
      </Layout>
      {modalVisible &&
        <LayoutModal title={'Корзина'} onClose={callbacks.closeModal}>
          <List items={store.getState().items} renderItem={renders.itemBasket}/>
          <BasketTotal amount={90} sum={8800}/>
        </LayoutModal>
      }
    </>
  );
}

export default App;