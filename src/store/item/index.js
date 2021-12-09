import StoreModule from "../module";
import { store } from '../../index';

class ItemStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      item: null,
    };
  }

  async loadItem(id){
    try {
      store.loaders.setLoaders('item', true)
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        item: json.result,
      });
    } catch (e) {
      console.log(e)
    } finally {
      store.loaders.setLoaders('item', false)
    }
  }

}

export default ItemStore;
