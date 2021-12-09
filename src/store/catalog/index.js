import StoreModule from "../module";
import {
  ARRAY_DECREASE_INDEX,
  DEFAULT_ITEMS_LIMIT, DEFAULT_ITEMS_SKIP, DEFAULT_PAGES_SKIP,
} from "../../constants";
import { store } from '../../index';

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      totalItemsCount: 0,
      activePage: 1
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(limit = DEFAULT_ITEMS_LIMIT, pageNumber){
    store.loaders.setLoaders('catalog', true)
    let skip = (pageNumber - ARRAY_DECREASE_INDEX) * DEFAULT_ITEMS_LIMIT
    if (!skip) {
      skip = DEFAULT_ITEMS_SKIP
    }
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      activePage: pageNumber ? pageNumber : DEFAULT_PAGES_SKIP,
      totalItemsCount: json.result.count,
      items: json.result.items
    });
    store.loaders.setLoaders('catalog', false)
  }
}

export default CatalogStore;
