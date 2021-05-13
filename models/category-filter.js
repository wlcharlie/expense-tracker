function categoryFilter(category) {
  if (category) {
    return { 'category.name': category }
  } else {
    return {}
  }
}

module.exports = categoryFilter