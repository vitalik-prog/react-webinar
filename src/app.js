import React, {useCallback, useEffect, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import { getTotals } from "./helpers/getTotals";
import TotalRow from "./components/total-row";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');
  const [isModalShown, setIsModalShown] = useState(false)

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isModalShown ? 'hidden' : 'auto';
  }, [isModalShown])

  const callbacks = {
    onCreateItem: useCallback(() => store.createItem(), [store]),
    onSelectItem: useCallback((code) => store.selectItem(code), [store]),
    onAddItemToCart: useCallback((code) => store.addItemToCart(code), [store]),
    onShowModal: useCallback(() => setIsModalShown(!isModalShown), [isModalShown])
  }

  const { totalProductsCount, wordDeclination, totalProductsPrice } = useCallback(getTotals(store.getState().cart), [store.getState().cart])

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls
        onShowModal={callbacks.onShowModal}
        totalInfoElement={
          totalProductsCount
            ? <span>{`${totalProductsCount} ${wordDeclination} / ${Number.parseInt(totalProductsPrice).toLocaleString('ru')}`} &#8381;</span>
            : <span>пусто</span>
        }
      />
      <List
        items={store.getState().items}
        onSelectItem={callbacks.onSelectItem}
        onAddItemToCart={callbacks.onAddItemToCart}
      />
      {isModalShown &&
        <Modal
          active={isModalShown}
          onClose={callbacks.onShowModal}
        >
          <List items={store.getState().cart}/>
          {store.getState().cart.length !== 0 && <TotalRow
            totalProductsCount={totalProductsCount}
            totalProductsPrice={totalProductsPrice}
          />}
        </Modal>
      }
    </Layout>
  );
}

export default App;