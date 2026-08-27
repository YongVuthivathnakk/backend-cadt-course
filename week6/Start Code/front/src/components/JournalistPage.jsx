import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  getArticlesByJournalist, getJournalistById } from "../services/api";
import { ArticleCard } from "./ArticleList";

export default function JournalistPage() {

  const { id } = useParams();
  const [articles, setArticles] = useState([])
  const [articleLoading, setArticleLoading] = useState(false)
  const [articleErrror, setArticleError] = useState("")
  const [journalist, setJournalist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const navigate = useNavigate();

useEffect(() => {
    fetchJournalist(); 
    fetchArticlesByJournalistId();
  }, []);

const fetchArticlesByJournalistId = async () => {
  try{
    setArticleLoading(true)
    const results = await getArticlesByJournalist(id)
    if(results) {
      setArticles(results)
      setArticleError("")
    } else {
      setArticles([])
      setArticleError("Articles not found")
    }
  } catch(err) {
    setArticleError("Fail to fetch articles");
  } finally{
    setArticleLoading(false)
  }
}

const fetchJournalist = async () => {
    try {
      setLoading(true);
      const found = await getJournalistById(id);
      if (found) {
        setJournalist(found);
        setError("");
      } else {
        setJournalist(null);
        setError("Journalist not found.");
      }
    } catch (err) {
      setError("Failed to fetch journalist.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => navigate(`/articles/${id}`)
  
  if (loading) return <div>Loading journalist...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!journalist) return <div>No journalist found.</div>;

  return (
    <div>
      <h2>
      {journalist.name}
      </h2>
  <div className="article-list">
      {articleLoading && <p>Loading...</p>}
      {articleErrror && <p>Error: {articleErrror}</p>}
      {!articles && <p>No articles found</p>}

       {articles.map((article) => (
          <ArticleCard2
            key={article.id}
            article={article}
            onView={handleView}
          
          />
        ))}
      </div>
    </div>
  )
}


function ArticleCard2({article, onView}) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">
        By {article.journalist}
      </div>

      <div className="article-actions">
      
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  )
}