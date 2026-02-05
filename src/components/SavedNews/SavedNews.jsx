import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({ articles, currentUser, onDeleteArticle }) {
  // Get unique keywords from saved articles
  const keywords = [
    ...new Set(
      articles.map((article) => article.keyword).filter(Boolean), // Remove any null/undefined keywords
    ),
  ];

  // Function to capitalize each word in a string
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Transform saved articles back to NewsCard format
  const transformArticleForDisplay = (savedArticle) => ({
    title: savedArticle.title,
    url: savedArticle.url,
    source: { name: savedArticle.source },
    urlToImage: savedArticle.imageUrl,
    publishedAt: savedArticle.date,
    description: savedArticle.description || "No description available",
    _id: savedArticle._id,
    keyword: savedArticle.keyword,
  });

  return (
    <div className="saved-news">
      <div className="saved-news__header">
        <h1 className="saved-news__title">Saved articles</h1>
        <div className="saved-news__subtitle">
          {currentUser?.name || "User"}, you have {articles.length} saved
          article{articles.length !== 1 ? "s" : ""}
        </div>
        {keywords.length > 0 && (
          <div className="saved-news__keywords-prompt">
            By keywords:{" "}
            <span className="saved-news__keywords">
              {keywords.length <= 2
                ? keywords.map((keyword) => capitalizeWords(keyword)).join(", ")
                : `${keywords
                    .slice(0, 2)
                    .map((keyword) => capitalizeWords(keyword))
                    .join(
                      ", ",
                    )} and ${keywords.length - 2} other${keywords.length - 2 > 1 ? "s" : ""}`}
            </span>
          </div>
        )}
      </div>
      {articles.length > 0 && (
        <div className="saved-news__content">
          <ul className="saved-news__cards-list">
            {articles.map((article, index) => (
              <li key={article._id || index}>
                <NewsCard
                  article={transformArticleForDisplay(article)}
                  isSaved={true}
                  isLoggedIn={true}
                  onSave={() => {}} // Not needed on saved news page
                  onDelete={() => onDeleteArticle(article)} // Pass original article for deletion
                  onSignInPrompt={() => {}} // Not needed since always logged in
                  isMainPage={false}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {articles.length === 0 && (
        <div className="saved-news__no-articles">
          <p>You haven&apos;t saved any articles yet.</p>
        </div>
      )}
    </div>
  );
}

export default SavedNews;
