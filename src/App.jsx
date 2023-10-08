import React from "react";
import Container from "@mui/material/Container";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";

function App() {
  // Sample articles for design testing
  const sampleArticles = [
    {
      title: "Test News 1",
      description: "This is a test news description 1.",
      image: "https://placehold.co/150",
      author: "John Doe",
      publishedAt: "2023-03-01T12:00:00Z",
    },
    {
      title: "Test News 2",
      description: "This is a test news description 2.",
      image: "https://placehold.co/150",
      author: "Jane Smith",
      publishedAt: "2023-04-01T12:00:00Z",
    },
    {
      title: "Test News 3",
      description: "This is a test news description 3.",
      image: "https://placehold.co/150",
      author: "John Doe",
      publishedAt: "2023-05-01T12:00:00Z",
    },
    {
      title: "Test News 4",
      description: "This is a test news description 4.",
      image: "https://placehold.co/150",
      author: "Jane Smith",
      publishedAt: "2023-06-01T12:00:00Z",
    },
  ];

  return (
    <Container>
      <NewsHeader />
      <NewsFeed articles={sampleArticles} />
    </Container>
  );
}

export default App;
