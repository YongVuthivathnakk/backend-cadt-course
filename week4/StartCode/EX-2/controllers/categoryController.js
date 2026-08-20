import {
  createCategory,
  deleteCategory,
  getArticlesByCategoryId,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../models/categoryModel.js";

export function getAllCategories(req, res) {
  res.status(200).json(getCategories());
}

export function getCategory(req, res) {
  const categoryId = parseInt(req.params.id);

  const category = getCategoryById(categoryId);
  if (!category) {
    return res.status(404).json({
      error: "Cateogry not found",
    });
  }

  res.json(category);
}

export function createNewCategory(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Name is required",
    });
  }

  const newCategory = createCategory(name);
  res.status(201).json(newCategory);
}

export function updateExistingCategory(req, res) {
  const categoryId = parseInt(req.params.id);
  const { name } = req.body;

 if (!name) {
    return res.status(404).json({
      error: "Name is required",
    });
  }


  const category = updateCategory(categoryId, name);

  if (!category) {
    return res.status(404).json({
      error: "Category not found",
    });
  }

  res.json(category);
}

export function removeCategory(req, res) {
  const categoryId = parseInt(req.params.id);
  const deleted = deleteCategory(categoryId);
  if (!deleted) {
    return res.status(404).json({
      error: "Category not found",
    });
  }
  res.status(204).send();
}



export function getCategoryArticles(req, res) {
  const categoryId = parseInt(req.params.id)
  const articles = getArticlesByCategoryId(categoryId)


  if (articles.length === 0) {
    return res.status(404).json({
      error: "No articles found for this journalist",
    });
  }

  res.json(articles);
}

