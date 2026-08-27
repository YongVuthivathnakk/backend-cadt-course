import { pool } from "../utils/database.js";

export async function getJournalists() {
    const [rows] = await pool.query("SELECT * FROM journalists")
    return rows;
}

export async function  getJournalistById(id) {
    const [rows] = await pool.query("SELECT * FROM journalists WHERE id = ? ", [id]);
    return rows[0] || null;
}

// Get all articles by journalistId

export async function getArticleByJournalistId(journalistId) {
  const [rows] = await pool.query(
    `
    SELECT
      a.id,
      a.title,
      a.content,
      j.name AS journalist,
      c.id AS categoryId,
      c.name AS categoryName
    FROM articles a
    INNER JOIN journalists j
      ON a.journalistId = j.id
    LEFT JOIN article_category ac
      ON a.id = ac.articleId
    LEFT JOIN categories c
      ON ac.categoryId = c.id
    WHERE j.id = ?
    ORDER BY a.id
    `, [journalistId]
  )

 const articles = [];

  for (const row of rows) {
    let article = articles.find(
      (article) => article.id === row.id
    );

    if (!article) {
      article = {
        id: row.id,
        title: row.title,
        content: row.content,
        journalist: row.journalist,
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