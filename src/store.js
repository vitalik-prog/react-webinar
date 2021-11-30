class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Подписчики на изменение state
    this.listners = [];
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для отписки
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }

  /**
   * Выбор state
   * @return {*}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {*}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister(this.state);
    }
  }

  // Действия приложения.
  // @todo
  // Нужно вынести в отдельный слой, так как Store не определяет конкретную структуру состояния.
  // Может быть как модуль (расширение) для Store

  /**
   * Создание записи
   */
  createItem() {
    const code = Math.max(0, ...this.state.items.map(item => item.code)) + 1;
    this.setState({
      items: this.state.items.concat({
        code,
        title: 'Новая запись №' + code
      })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      items: this.state.items.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected
          };
        }
        return item;
      })
    });
  }

  addItemToCart(code) {
    // -------------      First version START   -------------- //
    // let isProductExistInCart = false
    //
    // const newCart = this.state.cart.map(product => {
    //   if (product.code === code) {
    //     isProductExistInCart = true
    //     return {
    //       ...product,
    //       count: product.count + 1
    //     }
    //   }
    //   return product
    // })
    //
    // if (!isProductExistInCart) {
    //   const productToCart = {...this.state.items.find(item => item.code === code), count: 1}
    //   newCart.push(productToCart)
    // }
    // -------------      First version END      ------------ //

    // -------------      Second version START   -------------- //
    let isProductExistInCart = false
    const newCart = this.state.cart.slice(0)

    let i = 0;
    while (i <= this.state.cart.length) {
      if (newCart[i] && newCart[i].code === code) {
        isProductExistInCart = true
        newCart[i].count = newCart[i].count + 1
      }

      if (i === newCart.length && !isProductExistInCart) {
        const productToCart = {...this.state.items.find(item => item.code === code), count: 1}
        newCart.push(productToCart)
      }
      i++
    }
    // -------------      Second version END      ------------ //

    this.setState({
      ...this.state,
      cart: newCart
    });
  }
}

export default Store;