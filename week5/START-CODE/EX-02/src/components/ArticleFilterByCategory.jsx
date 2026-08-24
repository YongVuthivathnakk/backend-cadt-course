import { useEffect, useState } from 'react';
import axios from "axios";

export default function ArticleFilterByCategory() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [articles, setArticles] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

 const fetchArticles = async () => {
    // Fetch articles from the API
    try{
      setLoading(true)
       const res = await axios.get("http://localhost:3000/articles")
       setArticles(res.data)
    } catch(error) {
      console.log("Error fetching data: ", error)
    } finally {
      setLoading(false)
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    
    try{
      setLoading(true);
      const res = await axios.get("http://localhost:3000/categories")
      setCategories(res.data)
    } catch (error) {
      console.log("Failed to fetch categories: ",error);
    }
    finally{
      setLoading(false)
    }
  }

  const fetchArticlesByCategory = async (selectCategoryId) => {
   try{
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/categories/${selectCategoryId}/articles`)
      setArticles(res.data)
    } catch (error) {
      console.log("Failed to fetch articles: ",error);
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} id="categoryFilter">
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
            if(selectedCategoryId === '') return fetchArticles()

            return fetchArticlesByCategory(selectedCategoryId)
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            setSelectedCategoryId("")
            fetchArticles()
          }}
        >Reset Filters</button>
      </div>

      {
        !loading &&
     ( <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>)
      }
    </div>
  );
}