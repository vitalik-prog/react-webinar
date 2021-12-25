import StoreModule from "../module";

class CountriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      waiting: true,
      countries: []
    };
  }

  /**
   * Получение всех стран.
   * И запись в стор.
   */
  async load(){
    this.updateState({
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);
      this.updateState({
        countries: json.result.items.map(country => {
          return {...country, value: country._id}
        }),
      });

    } catch (e){
      this.updateState({
        countries: [],
      });
    } finally {
      this.updateState({
        waiting: false,
      });
    }
  }
}

export default CountriesStore;
