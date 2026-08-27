import { pool } from "../utils/database.js";

export async function getCategories() {
    const [rows] = await pool.query(`SELECT * FROM categories`)
    return rows
}   