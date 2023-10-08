import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import NewsArticle from "./NewsArticle";

/**
 * The main news feed list of atricles.
 */
function NewsFeed(props) {
  const { articles } = props;

  if (!articles?.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {articles.map((article, index) => (
        <NewsArticle key={index} {...article} />
      ))}
    </div>
  );
}

export default NewsFeed;
