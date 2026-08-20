import { createJournalist, deleteJournalist, getArticlesByJournalistId, getJournalistById, getJournalists, updateJournalist } from "../models/journalistModel.js";

export function getAllJournalists(req, res) {
  res.status(200).json(getJournalists());
}

export function getJournalist(req, res) {
  const journalistId = parseInt(req.params.id);
  const journalist = getJournalistById(journalistId);
  if (!journalist) {
    return res.status(404).json({
      error: "Journalist not found",
    });
  }
  res.json(journalist);
}

export function createNewJournalist(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
    });
  }
  const newJournalist = createJournalist(name, email)
  res.status(201).json(newJournalist)
}


export function updateExistingJournalist(req,res ) {
    const journalistId = parseInt(req.params.id)
    const {name, email } = req.body

    if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
    });

    const journalist = updateJournalist(journalistId, name, email)

    if(!journalist) {
         return res.status(404).json({
      error: "Journalist not found",
    });
    }
    res.json(journalist)
  }
}

export function removeJournalist(req, res) {
    const journalistId = parseInt(req.params.id)
    const deleted = deleteJournalist(id)
      if (!deleted) {
    return res.status(404).json({
      error: "Category not found",
    });
  }
  res.status(204).send();
}

export function getJournalistArticles(req, res) {
  const journalistId = parseInt(req.params.id);

  const articles = getArticlesByJournalistId(journalistId);

  if (articles.length === 0) {
    return res.status(404).json({
      error: "No articles found for this journalist",
    });
  }

  res.json(articles);
}