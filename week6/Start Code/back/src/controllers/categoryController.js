import * as categoriesRepository from "../repositories/sqlCategoryRepository.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await categoriesRepository.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
}
