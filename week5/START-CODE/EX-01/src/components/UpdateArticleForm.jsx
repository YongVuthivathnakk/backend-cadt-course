import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function UpdateArticleForm() {
  const {id} = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryId: "",
  });

  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    // Function to fetch article by ID
    const fetchArticle = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`http://localhost:3000/articles/${id}`);

        setForm({
          title: res.data.title,
          content: res.data.content,
          journalistId: res.data.journalistId,
          categoryId: res.data.categoryId,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    
  setError("");

  // Validate required fields
  if (
    !form.title.trim() ||
    !form.content.trim() ||
    !form.journalistId ||
    !form.categoryId
  ) {
    setError("All fields are required.");
    return;
  }

  // Validate IDs are numbers
  const journalistId = Number(form.journalistId);
  const categoryId = Number(form.categoryId);

  if (isNaN(journalistId) || isNaN(categoryId)) {
    setError("Journalist ID and Category ID must be numbers.");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.put(
      `http://localhost:3000/articles/${id}`,
      {
        ...form,
        journalistId,
        categoryId,
      }
    );

    console.log("Article created:", response.data);
  } catch (error) {
    console.log("Error creating article:", error);
    setError("Failed to update article.");
  } finally {
    setLoading(false);
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <br />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <br />
      <input
        name="journalistId"
        value={form.journalistId}
        onChange={handleChange}
        placeholder="Journalist ID"
        required
      />
      <br />
      <input
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
        required
      />
      <br />
      <button type="submit">{loading ? "loading...." : "Update"}</button>
      {error && (
  <p>Error: {error}</p>
)}
    </form>
  );
}
