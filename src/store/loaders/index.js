import StoreModule from "../module";

class LoadersStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      name: '',
      status: false
    };
  }

  setLoaders(name, status){
    this.setState({
      name, status
    });
  }

}

export default LoadersStore;
