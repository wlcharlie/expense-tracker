function categoryFilter(categoryId, userId) {
  if (categoryId) {
    return { categoryId: categoryId, userId: userId }
  } else {
    return { userId: userId }
  }
}

module.exports = categoryFilter
