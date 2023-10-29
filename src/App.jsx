import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import Typography from "@mui/material/Typography";

const DEFAULT_PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");

  const abortController = useRef(new AbortController());

  async function loadData(query, category, page) {
    const baseEndpoint = `https://newsapi.org/v2/top-headlines?country=eg&pageSize=${DEFAULT_PAGE_SIZE}&category=${category}&page=${page}&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`;

    const response = await fetch(
      query ? `${baseEndpoint}&q=${query}` : baseEndpoint,
      {
        signal: abortController.current.signal,
      }
    );
    const data = await response.json();
    if (data.status !== "ok") {
      throw new Error(`Error: ${data.code}, Details: ${data.message}`);
    }
    return data.articles?.map((article) => {
      const {
        title,
        description,
        urlToImage: image,
        url,
        author,
        publishedAt,
      } = article;
      return {
        title,
        description,
        image,
        url,
        author,
        publishedAt,
      };
    });
  }

  const fetchArticles = useCallback(
    debounce((query, category, page) => {
      setLoading(true);
      setError(undefined);
      abortController.current.abort();
      abortController.current = new AbortController();

      loadData(query, category, page)
        .then((articles) => {
          setLoading(false);
          setArticles(articles);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    }, 500),
    []
  );

  useEffect(() => {
    fetchArticles(query, category, page);

    return () => {
      // Cleanup: Abort any pending requests
      abortController.current.abort();
    };
  }, [query, category, page]);

  const handleSearchChange = (newQuery) => {
    setQuery(newQuery);
    // Reset page number when query changes
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  function handleNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  return (
    <Container>
      <NewsHeader
        category={category}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      {!error && (
        <NewsFeed
          articles={articles}
          loading={loading}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePrevPage}
          disabled={loading || page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={loading || articles.length < DEFAULT_PAGE_SIZE}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default App;
