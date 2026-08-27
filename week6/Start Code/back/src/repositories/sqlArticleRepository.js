import { pool } from "../utils/database.js";

//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

// Get all articles
export async function getArticles() {
  const [rows] = await pool.query(`
 SELECT
      a.id,
      a.title,
      a.content,
      a.journalistId,
      j.name AS journalistName,
      c.id AS categoryId,
      c.name AS categoryName
    FROM articles a
    INNER JOIN journalists j
      ON a.journalistId = j.id
    LEFT JOIN article_category ac
      ON a.id = ac.articleId
    LEFT JOIN categories c
      ON ac.categoryId = c.id
    ORDER BY a.id;
    `);
  const articles = [];
  for (const row of rows) {
    let article = articles.find((article) => article.id === row.id);

    if (!article) {
      article = {
        id: row.id,
        title: row.title,
        content: row.content,
        journalistId: row.journalistId,
        journalist: row.journalistName,
        categories: [],
      };

      articles.push(article);
    }

    if (row.categoryId !== null) {
      article.categories.push({
        id: row.categoryId,
        name: row.categoryName,
      });
    }
  }

  return articles;
}

// Get one article by ID
export async function getArticleById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      a.id,
      a.title,
      a.content,
      a.journalistId,
      c.id AS categoryId,
      c.name AS categoryName
    FROM articles a
    LEFT JOIN article_category ac
      ON a.id = ac.articleId
    LEFT JOIN categories c
      ON ac.categoryId = c.id
    WHERE a.id = ?
    `,
    [id],
  );

  if (rows.length === 0) {
    return null;
  }

  const article = {
    id: rows[0].id,
    title: rows[0].title,
    content: rows[0].content,
    journalistId: rows[0].journalistId,
    categories: rows
      .filter((row) => row.categoryId !== null)
      .map((row) => ({
        id: row.categoryId,
        name: row.categoryName,
      })),
  };

  return article;
}

// Create a new article
export async function createArticle(article) {
  const [result] = await pool.query(
    `
    INSERT INTO articles (title, content, journalistId)
    VALUES (?, ?, ?)
    `,
    [article.title, article.content, article.journalistId],
  );

  const articleId = result.insertId;

  for (const categoryId of article.categoryIds) {
    await pool.query(
      `
      INSERT INTO article_category (articleId, categoryId)
      VALUES (?, ?)
      `,
      [articleId, categoryId],
    );
  }

  return {
    id: articleId,
    title: article.title,
    content: article.content,
    journalistId: article.journalistId,
    categoryIds: article.categoryIds,
  };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  const [result] = await pool.query(
    `
        UPDATE articles
        SET title = ?, content = ?, journalistId = ?
        WHERE id = ?
        `,
    [
      updatedData.title,
      updatedData.content,
      updatedData.journalistId,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  await pool.query(`DELETE FROM article_category WHERE articleId = ?`, [id]);
  for (const categoryId of updatedData.categoryIds) {
    await pool.query(
      `
      INSERT INTO article_category (articleId, categoryId)
      VALUES (?, ?)
      `,
      [id, categoryId],
    );
  }

  return getArticleById(id);
}

// Delete an article by ID
export async function deleteArticle(id) {
  // TODO
  const [result] = await pool.query(`DELETE FROM articles WHERE id = ?`, [id]);

  return result.affectedRows > 0;
}
