import { useEffect, useState } from "react";
import axios from "axios";
export default function ArticleFilter() {
  // const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [journalistId, setJournalistId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/articles");
      setArticles(res.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/journalists");
      setJournalists(res.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("Failed to fetch categories: ", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchArticlesByQuery = async (filters = {}) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/articles", {
        params: filters,
      });
      setArticles(res.data);
    } catch (error) {
      console.log("Failed to fetch categories: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          value={journalistId}
          onChange={(e) => setJournalistId(e.target.value)}
          id="journalistFilter"
        >
          <option value="">All Journalists</option>
          {journalists.map((journalist) => (
            <option value={journalist.id}>{journalist.name}</option>
          ))}

          {/* Options for journalists */}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          id="categoryFilter"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option value={category.id} key={index}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            if (journalistId === "" && categoryId === "") {
              return fetchArticles();
            }

            return fetchArticlesByQuery({ journalistId, categoryId });
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            // Logic to reset filters
            setCategoryId("");
            setJournalistId("");
            fetchArticles();
          }}
        >
          Reset Filters
        </button>
      </div>
      {!loading && (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <strong>{article.title}</strong> <br />
              <small>
                By Journalist #{article.journalistId} | Category #
                {article.categoryId}
              </small>
              <br />
              <button disabled>Delete</button>
              <button disabled>Update</button>
              <button disabled>View</button>
            </li>
          ))}
        </ul>
      )}
      {articles.length === 0 && <p>No articles avialable</p>}
    </div>
  );
}
