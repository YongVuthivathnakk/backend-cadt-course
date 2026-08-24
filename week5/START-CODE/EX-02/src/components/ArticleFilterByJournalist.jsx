import { useEffect, useState } from 'react';
import axios from 'axios'
export default function ArticleFilterByJournalist() {
  const [loading, setLoading] = useState("")
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState("")
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists()
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

  const fetchJournalists = async () => {
    // Fetch journalists from the API
      try{
      setLoading(true)
       const res = await axios.get("http://localhost:3000/journalists")
       setJournalists(res.data)
    } catch(error) {
      console.log("Error fetching data: ", error)
    } finally {
      setLoading(false)
    }
  };

  const fetchArticlesByJournalist = async (selectedJournalistId) => {
   try{
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/journalists/${selectedJournalistId}/articles`)
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
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select value={selectedJournalistId} onChange={(e) => setSelectedJournalistId(e.target.value)} id="journalistFilter">
          <option value="">All Journalists</option>
          {
            journalists.map((journalist) => (
              <option value={journalist.id} >{journalist.name}</option>
            ))
          }

          {/* Options for journalists */}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
                if(selectedJournalistId === '') return fetchArticles()

            return fetchArticlesByJournalist(selectedJournalistId)
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
                   setSelectedJournalistId("")
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