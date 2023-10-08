import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewsArticle from "./NewsArticle";

/**
 * The main news feed list of atricles.
 */
function NewsFeed(props) {
  const { articles, loading } = props;

  if (loading) {
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

  if (!articles.length) {
    return (
      <Typography
        align="center"
        variant="h6"
        color="textSecondary"
        marginTop={4}
      >
        No articles found.
      </Typography>
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
