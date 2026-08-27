import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getArticleById,
  createArticle,
  updateArticle,
  getJournalists,
  getCategories,
} from "../services/api";

export default function ArticleForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journalists, setJournalists] = useState([]);
  const [loadingJournalist, setLoadingJournalist] = useState(true);
  const [errorJournalist, setErrorJournalist] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [errorCategory, setErrorCategory] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryIds: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle(id);
    }
    const fetchOptions = async () => {
      try {
        const [journalistResults, categoryResults] = await Promise.all([
          getJournalists(),
          getCategories(),
        ]);
        setJournalists(journalistResults || []);
        setCategories(categoryResults || []);
        setErrorJournalist(journalistResults ? "" : "Failed to fetch journalists.");
        setErrorCategory(categoryResults ? "" : "Failed to fetch categories.");
      } catch {
        setErrorJournalist("Failed to fetch journalists.");
        setErrorCategory("Failed to fetch categories.");
      } finally {
        setLoadingJournalist(false);
        setLoadingCategory(false);
      }
    };

    fetchOptions();
  }, [id, isEdit]);

  const fetchArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const article = await getArticleById(id);
      setFormData({
        ...article,
        journalistId: String(article.journalistId),
        categoryIds: (article.categories || []).map((category) =>
          String(category.id),
        ),
      });
    } catch {
      setError("Failed to load article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      categoryIds: checked
        ? [...formData.categoryIds, value]
        : formData.categoryIds.filter((categoryId) => categoryId !== value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.categoryIds.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const articleData = {
        ...formData,
        journalistId: Number(formData.journalistId),
        categoryIds: formData.categoryIds.map(Number),
      };
      if (isEdit) {
        await updateArticle(id, articleData);
      } else {
        await createArticle(articleData);
      }
      navigate("/articles");
    } catch {
      setError("Failed to submit article.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="article-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Article" : "Create Article"}</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <br />
        <select
          name="journalistId"
          value={formData.journalistId}
          onChange={handleChange}
          required
          disabled={loadingJournalist}
        >
          <option value="">Select a journalist</option>
          {journalists.map((journalist) => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.name}
            </option>
          ))}
        </select>
        {errorJournalist && <p style={{ color: "red" }}>{errorJournalist}</p>}
        <br />
        <fieldset className="category-fieldset" disabled={loadingCategory}>
          <legend>Categories</legend>
          <div className="category-options">
            {categories.map((category) => (
              <label className="category-option" key={category.id}>
                <input
                  type="checkbox"
                  value={String(category.id)}
                  checked={formData.categoryIds.includes(String(category.id))}
                  onChange={handleCategoryChange}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {errorCategory && <p style={{ color: "red" }}>{errorCategory}</p>}
        <br />
        <button className="main" type="submit">
          {isEdit ? "Edit " : "Create"}
        </button>
      </form>
    </>
  );
}
