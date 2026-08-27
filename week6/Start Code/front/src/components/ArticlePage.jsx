import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, getJournalistById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();
  const [journalist, setJournalist] = useState(null)
  const [journalistLoading, setJournalistLoading] = useState(false)
  const [journalistError, setJournalistError] = useState("")

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const found = await getArticleById(id);
        if (!found) {
          setArticle(null);
          setError("Article not found.");
          return;
        }

        setArticle(found);
        setJournalistLoading(true);
        const foundJournalist = await getJournalistById(found.journalistId);
        if (foundJournalist) {
          setJournalist(foundJournalist);
          setJournalistError("");
        } else {
          setJournalist(null);
          setJournalistError("Journalist not found.");
        }
        setError("");
      } catch {
        setError("Failed to fetch article or journalist.");
      } finally {
        setJournalistLoading(false);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;
  if (journalistLoading) return <div>Loading journalist...</div>;
  if (journalistError) return <div>Error: {journalistError}</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist:</strong> {journalist?.name}
      </div>
      <div style={
        {
          display: "flex"
        }
      }>
        <strong>Category:</strong> 
        <div className="article-category-container">
        {article.categories.map(
          (category, index) => (
            <p key={index} className="article-category">
              {category.name}
            </p>
          )
        )}
        </div>
      </div>
    </div>
  );
}
