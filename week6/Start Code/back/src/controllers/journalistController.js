import * as journalistRepository from "../repositories/sqlJournalistRepository.js";

// GET /api/journalists
export async function getAllJournalists(req, res) {
  try {
    const journalists = await journalistRepository.getJournalists();
    res.json(journalists);
  } catch (error) {
    console.error("Error fetching journalists:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/journalists/:id

export async function getJournalist(req, res) {

    const id = parseInt(req.params.id)
  try {
    const journalist = await journalistRepository.getJournalistById(id);
    if (!journalist) {
      return res.status(404).json({ message: "Journalist not found" });
    }

    res.json(journalist);
  } catch (error) {
    console.error("Error fetching journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}


// GET /api/journalists/:id/article
export async function getArticleByJournalist(req, res) {
  const journalistId = parseInt(req.params.id);

  try {
    const articles =
      await journalistRepository.getArticleByJournalistId(journalistId);

    return res.json(articles);
  } catch (error) {
    console.error("Error fetching journalist articles:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}