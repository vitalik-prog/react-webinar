class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = Object.assign({
      items: [],
      basket: {
        items: [],
        sum: 0,
        amount: 0
      }
    }, initState);
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
        title: 'Новая запись №'+code
      })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code Код товара
   */
  deleteItem(code) {
    this.setState({
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code Код товара
   */
  selectItem(code) {
    this.setState({
      items: this.state.items.map(item => {
        if (item.code === code){
          return {
            ...item,
            selected: !item.selected
          };
        }
        return item;
      })
    });
  }

  /**
   * Добавление товара в корзину
   * @param code Код товара
   */
  addToBasket(code){
    let exists = false;
    let amount = 0;
    let sum = 0;
    // Ищем товар в корзие, чтобы увеличить его количество.
    // Заодно созадётся новый массив и пересчитывается итог
    const basketItems = this.state.basket.items.map(item => {
      // Считаем суммы для текущих позций в корзине
      amount += item.amount;
      sum += item.price * item.amount;
      // Искомый товар
      if (item.code === code){
        exists = true;
        amount += 1;
        sum += item.price;
        return {...item, amount: item.amount + 1};
      }
      return item
    });
    if (!exists) {
      // Если товар не был найден в корзине, то добавляем его
      // Поиск товара в каталоге, чтобы его в корзину добавить
      const item = this.state.items.find(item => item.code === code);
      basketItems.push({...item, amount: 1});
      amount += 1;
      sum += item.price;
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.setState({
      ...this.state,
      basket: {
        items: basketItems,
        amount,
        sum
      }
    })
  }
  }
}

export default Store;