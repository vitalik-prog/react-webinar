import StoreModule from "../module";
import request from "../../utils/http";
import mappingErrors from "../../utils/maping-errors";

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      countries: [],
      validationErrors: {},
      waiting: true
    };
  }

  /**
   * Загрузка товара
   */
  async load(id){
    this.updateState({
      waiting: true,
      data: {},
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
      });
    } catch (e){
      this.updateState({
        data: {},
        waiting: false,
      });
    } finally {
      this.updateState({
        waiting: false,
      });
    }
  }

  /**
   * Создание товара
   */
  async create(article) {
    this.updateState({
      waiting: true,
      validationErrors: {}
    });

    try {
      const response = await request(
        `/api/v1/articles/?lang=ru&fields=%2A`,
        'POST',
        article
      )

      if (response.error && response.error.code === 'Validation') {
        const errors = mappingErrors(response.error.data.issues)
        this.updateState({
          validationErrors: errors,
        });
        return
      }

      this.updateState({
        data: response.result,
        validationErrors: {}
      });
    } catch (e) {
      console.log(e)
    } finally {
      this.updateState({
        waiting: false
      });
    }
  }

  /**
   * Изменение товара
   */
  async update(article) {
    this.updateState({
      waiting: true,
      validationErrors: {}
    });

    try {
      const { _id  } = article
      const response = await request(
        `/api/v1/articles/${_id}?fields=%2A&lang=ru`,
        'PUT',
        article
      )

      if (response.error && response.error.code === 'Validation') {
        const errors = mappingErrors(response.error.data.issues)
        this.updateState({
          validationErrors: errors,
        });
        return
      }

      this.updateState({
        data: response.result,
        validationErrors: {}
      });
    } catch (e) {
      console.log(e)
    } finally {
      this.updateState({
        waiting: false
      });
    }
  }

  /**
   * Удаление товара
   */
  async delete(id) {
    try {
      await request(
        `/api/v1/articles/${id}?fields=_id&lang=ru`,
        'DELETE',
      )
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Получение всех стран
   */
  async getCountries() {
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

export default ArticleStore;
