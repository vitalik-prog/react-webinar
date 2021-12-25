import StoreModule from "../module";
import createCategoriesTree from "../../utils/create-categories-tree";

class CategoriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      waiting: true,
      categories: []
    };
  }

  /**
   * Получение всех категорий товаров.
   * И запись в стор.
   */
  async load(){
    const response = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      categories: createCategoriesTree(json.result.items),
      waiting: false,
    });
  }
}

export default CategoriesStore;
