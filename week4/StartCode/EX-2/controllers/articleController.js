import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../models/articleModel.js";

export function getAllArticles(req, res) {
  res.json(getArticles());
}

export function getArticle(req, res) {
  const articleId = parseInt(req.params.id);
  const article = getArticleById(articleId);

  if (!article) {
    return res.status(404).json({
      error: "Article not found",
    });
  }
  res.json(article);
}

export function createNewArticle(req, res) {
  const { title, content, journalistId, categoryId } = req.body;
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({
      error: "Title, content, journalistId, and categoryId are required",
    });
  }
  const newArticle = createArticle(title, content, journalistId, categoryId);
  res.status(201).json(newArticle);
}

export function updateExistingArticle(req, res) {
  const articleId = parseInt(req.params.id);

  const { title, content, journalistId, categoryId } = req.body;

  const article = updateArticle(articleId, title, content, journalistId, categoryId);
  if (!article) {
    return res.status(404).json({
      error: "Article not found",
    });
  }

  res.json(article);
}

export function removeArticle(req, res) {
  const articleId = parseInt(req.params.id);

  const deleted = deleteArticle(articleId);
  if (!deleted) {
    return res.status(404).json({
      error: "Article not found",
    });
  }
  res.status(204).send();
}
