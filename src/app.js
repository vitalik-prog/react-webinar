import React from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls store={store}/>
      <List store={store}/>
    </Layout>
  );
}

export default App;