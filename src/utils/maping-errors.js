export default function mappingErrors(errors) {
  return {
    title: errors.filter(error => error.path === `title.'ru'`),
    description: errors.filter(error => error.path === 'description'),
    maidIn: errors.filter(error => error.path === 'maidIn' || error.path === 'maidIn._id'),
    category: errors.filter(error => error.path === 'category' || error.path === 'category._id'),
    edition: errors.filter(error => error.path === 'edition'),
    price: errors.filter(error => error.path === 'price'),
  }
}
