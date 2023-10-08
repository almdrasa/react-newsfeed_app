import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  async function loadData(query) {
    const baseEndpoint = `https://newsapi.org/v2/top-headlines?country=eg&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`;
    const response = await fetch(
      query ? `${baseEndpoint}&q=${query}` : baseEndpoint
    );
    const data = await response.json();
    return data.articles.map((article) => {
      const {
        title,
        description,
        urlToImage: image,
        author,
        publishedAt,
      } = article;
      return {
        title,
        description,
        image,
        author,
        publishedAt,
      };
    });
  }

  useEffect(() => {
    setLoading(true);
    loadData(query)
      .then((articles) => {
        setLoading(false);
        setArticles(articles);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [query]);

  const handleSearchChange = (query) => {
    setQuery(query);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
    </Container>
  );
}

export default App;
