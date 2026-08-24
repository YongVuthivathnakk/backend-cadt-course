import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function ArticleForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
     e.preventDefault();

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

    const response = await axios.post(
      "http://localhost:3000/articles",
      {
        ...form,
        journalistId,
        categoryId,
      }
    );

    console.log("Article created:", response.data);
  } catch (error) {
    console.log("Error creating article:", error);
    setError("Failed to create article.");
  } finally {
    setLoading(false);
  }
  };

  return (

    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <form onSubmit={handleSubmit}>
        <h3>Add New Article</h3>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
        <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
        <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
        <button type="submit">{loading ? "loading...." : "Add"}</button>
        {error && (
  <p>Error: {error}</p>
)}
      </form>

    </div>
  );
}
