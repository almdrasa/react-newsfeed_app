import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewsArticle from "./NewsArticle";
import LoadingArticle from "./LoadingArticle";

/**
 * The main news feed list of atricles.
 */
function NewsFeed(props) {
  const { articles, loading, pageSize } = props;
  return (
    <Box>
      {loading &&
        [...Array(pageSize)].map((_, index) => <LoadingArticle key={index} />)}
      {!loading && articles.length === 0 && (
        <Typography
          align="center"
          variant="h6"
          color="textSecondary"
          marginTop={4}
        >
          No articles found.
        </Typography>
      )}
      {!loading &&
        articles.length > 0 &&
        articles.map((article, index) => (
          <NewsArticle key={index} {...article} />
        ))}
    </Box>
  );
}

export default NewsFeed;
