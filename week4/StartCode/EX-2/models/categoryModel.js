import { getArticles } from "./articleModel.js";

const categories = [
  { id: 1, name: "Politics" },
  { id: 2, name: "Technology" },
  { id: 3, name: "Sports" },
];

export function getCategories() {
  return categories;
}
export function getCategoryById(id) {
  return categories.find((category) => category.id === id);
}

export function updateCategory(id, name) {
  const category = getCategoryById(id)
  if(!category) {
    return null
  }

  if(name) category.name = name;

  return category
}

export function createCategory(name) {
  const newCategory = {
    id: categories.length + 1,
    name: name,
  };
  categories.push(newCategory);
  return newCategory;
}

export function deleteCategory(id) {
    const index = categories.findIndex((category) => category.id === id)

    if(index === -1) {
        return false
    }
    categories.splice(index, 1)
    return true
}

export function getArticlesByCategoryId(categoryId) {
  return getArticles().filter((article) => article.categoryId === categoryId)
}
