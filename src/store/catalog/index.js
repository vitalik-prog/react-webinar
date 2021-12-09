import StoreModule from "../module";
import {
  ARRAY_DECREASE_INDEX,
  DEFAULT_ITEMS_LIMIT, DEFAULT_ITEMS_SKIP, DEFAULT_PAGES_SKIP,
} from "../../constants";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      totalItemsCount: 0,
      activePage: 1,
      loading: false
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(pageNumber, limit = 10){
    this.setState({
      ...this.getState(),
      loading: true
    });
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
      items: json.result.items,
      loading: false
    });
  }
}

export default CatalogStore;
