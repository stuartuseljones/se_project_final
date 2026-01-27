import React from "react";
import "./NewsCard.css";

function NewsCard({
  article,
  isSaved,
  isLoggedIn,
  onSave,
  onDelete,
  onSignInPrompt,
  isMainPage,
}) {
  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // prevent card click event

    if (!isLoggedIn) {
      if (onSignInPrompt) {
        onSignInPrompt();
      }
      return;
    }

    if (isSaved && onDelete) {
      onDelete(article);
    } else if (!isSaved && onSave) {
      onSave(article);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="news-card"
      onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
    >
      {!isMainPage && (
        <div className="news-card__keyword-badge">
          {article.keyword || "General"}
        </div>
      )}
      {isMainPage && !isLoggedIn && (
        <div className="news-card__bookmark-wrapper">
          <button
            className={"news-card__bookmark"}
            aria-label="Bookmark article"
            onClick={handleBookmarkClick}
          ></button>
          <div className="news-card__signin-prompt">
            Sign in to save articles
          </div>
        </div>
      )}

      {isLoggedIn && isMainPage && (
        <div className="news-card__bookmark-wrapper">
          <button
            className={`news-card__bookmark ${isSaved ? "news-card__bookmark_saved" : ""}`}
            aria-label="Bookmark article"
            onClick={handleBookmarkClick}
          ></button>
          {isSaved && (
            <span className="news-card__delete-prompt">Remove from saved</span>
          )}
        </div>
      )}
      {isLoggedIn && !isMainPage && (
        <div className="news-card__bookmark-wrapper">
          <button
            className={"news-card__bookmark news-card__bookmark_remove"}
            aria-label="Bookmark article"
            onClick={handleBookmarkClick}
          ></button>
          <span className="news-card__delete-prompt">Remove from saved</span>
        </div>
      )}
      <img
        className="news-card__image"
        src={article.urlToImage || "/placeholder-image.jpg"}
        alt={article.title}
      />
      <div className="news-card__content">
        <p className="news-card__date">{formatDate(article.publishedAt)}</p>
        <h2 className="news-card__title">{article.title}</h2>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
