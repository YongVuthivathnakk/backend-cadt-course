const articles = [
  {
    id: 1,
    title: "Election Results 2025",
    content: "The final results of the 2025 elections are out...",
    journalistId: 1,
    categoryId: 1,
  },
  {
    id: 2,
    title: "New Smartphone Breakthrough",
    content: "A revolutionary phone with foldable glass has been released...",
    journalistId: 2,
    categoryId: 2,
  },
  {
    id: 3,
    title: "Champions League Highlights",
    content: "Here's what you missed in last night's Champions League game...",
    journalistId: 3,
    categoryId: 3,
  },
  {
    id: 4,
    title: "Tech Giants Face Congress",
    content: "Major tech CEOs testify on regulation and privacy...",
    journalistId: 1,
    categoryId: 2,
  },
  {
    id: 5,
    title: "Olympics 2028: Cities Shortlisted",
    content: "These are the cities that made the final cut...",
    journalistId: 3,
    categoryId: 3,
  },
];

export function getArticles(filters={}) {
  let result = articles;
  if(filters.journalistId) {
    result = result.filter((article) => article.journalistId === Number(filters.journalistId))
  }
  if(filters.categoryId) {
    result = result.filter((article) => article.categoryId === Number(filters.categoryId))
  }

  return result 

}

export function getArticleById(id) {
  return articles.find((article) => article.id === id);
}

export function createArticle(title, content, journalistId, categoryId) {
  const newArticle = {
    id: articles.length + 1,
    title: title,
    content: content,
    journalistId: journalistId,
    categoryId: categoryId,
  };

  articles.push(newArticle);
  return newArticle;
}

export function updateArticle(id, title, content, journalistId, categoryId) {
  const article = getArticleById(id);
  if (title) article.title = title;
  if (content) article.content = content;
  if (journalistId) article.journalistId = journalistId;
  if (categoryId) article.categoryId = categoryId;

  return article;
}

export function deleteArticle(id) {
  const index = articles.findIndex((article) => article.id === id);

  if (index === -1) {
    return false;
  }
  articles.splice(index, 1);
  return true;
}
