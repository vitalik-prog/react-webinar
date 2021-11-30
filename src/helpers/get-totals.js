import plural from 'plural-ru';

export const getTotals = (cart) => {
  const totalProductsCount = cart.reduce((accumulator, product) => {
    return accumulator + product.count;
  }, 0)

  const totalProductsPrice = cart.reduce((accumulator, product) => {
    return accumulator + (product.price * product.count);
  }, 0)

  return {
    totalProductsCount,
    wordDeclination: plural(totalProductsCount, 'товар', 'товара', 'товаров'),
    totalProductsPrice
  }
}
