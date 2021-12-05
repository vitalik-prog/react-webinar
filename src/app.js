import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import LayoutModal from "./components/layout-modal";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  const [modalVisible, setModalVisible] = useState(false);

  const callbacks = {
    onCreateItem: useCallback(() => store.createItem(), [store]),
    onSelectItem: useCallback((code) => store.selectItem(code), [store]),
    onDeleteItem: useCallback((code) => store.deleteItem(code), [store]),

    openModal: useCallback(() => setModalVisible(true), [setModalVisible]),
    closeModal: useCallback(() => setModalVisible(false), [setModalVisible]),
  }

  return (
    <>
      <Layout head={<h1>Приложение на чистом JS</h1>}>
        <Controls onCreate={callbacks.openModal}/>
        <List items={store.getState().items}
              onSelectItem={callbacks.onSelectItem}
              onDeleteItem={callbacks.onDeleteItem}/>
      </Layout>
      {modalVisible &&
        <LayoutModal title={'Корзина'} onClose={callbacks.closeModal}>
          Список товара
        </LayoutModal>
      }
    </>
  );
}

export default App;