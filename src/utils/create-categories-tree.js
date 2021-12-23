export default function createCategoriesTree(categories) {
  for (let i = 0; i < categories.length; i++) {
    categories[i].children = categories.filter(item => item.parent && item.parent._id === categories[i]._id)
  }
  const tree = categories.filter(item => item.children && !item.parent)

  return getChangedTitles(tree)
}

const getChangedTitles = (tree) => {
  const newCategories = []

  const recursive = (tree, count = 0) => {
    tree.forEach(node => {
      newCategories.push({ value: node._id, title: '- '.repeat(count) + node.title })
      if (!node.children) {
        return count
      }

      recursive(node.children, count + 1)
    })
  }
  recursive(tree)

  return newCategories
}
