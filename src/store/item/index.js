import StoreModule from "../module";

class ItemStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      item: null,
      loading: false
    };
  }

  /**
   * Загрузка одного товара
   */
  async loadItem(id){
    try {
      this.setState({
        ...this.getState(),
        loading: true
      });
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        item: json.result,
        loading: false
      });
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Загрузка одного товара
   */
  resetState() {
    this.setState({
      ...this.initState(),
    });
  }

}

export default ItemStore;
