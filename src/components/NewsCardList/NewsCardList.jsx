import React from "react";
import "./newsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList() {
  return (
    <section className="news-card-list">
      <NewsCard />
      <p>News Card List Component</p>
    </section>
  );
}

export default NewsCardList;
