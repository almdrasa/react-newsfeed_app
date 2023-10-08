import React from "react";
import NewsArticle from "./NewsArticle";

/**
 * The main news feed list of atricles.
 */
function NewsFeed(props) {
  const { articles } = props;

  return (
    <div>
      {articles.map((article, index) => (
        <NewsArticle key={index} {...article} />
      ))}
    </div>
  );
}

export default NewsFeed;
