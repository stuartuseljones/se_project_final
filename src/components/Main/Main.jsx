import "./Main.css";
import NotFound from "../../assets/not-found.svg";

import NewsCard from "../NewsCard/NewsCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";

import { useState } from "react";

function Main({
  articles,
  isLoading,
  searchKeyword,
  hasError,
  onSaveArticle,
  onDeleteArticle,
  isLoggedIn,
  isArticleSaved,
  onSignInClick,
}) {
  const INITIAL_COUNT = 3; // show 3 articles initially
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3); // show 3 more per click
  };

  const hasMore = visibleCount < articles.length;
  const hasSearched = searchKeyword && searchKeyword.length > 0;
  const hasResults = articles.length > 0;

  return (
    <main className="main">
      {/* Loading State */}
      {isLoading && <Preloader />}

      {/* No Results State */}
      {!isLoading && hasSearched && !hasResults && (
        <div className="main__container">
          <div className="main__no-results-container">
            <img
              className="main__no-results-image"
              src={NotFound}
              alt="No results found"
            />
            <div className="main__no-results-title">Nothing Found</div>
            <div className="main__no-results-text">
              Sorry, but nothing matched <br /> your search terms.
            </div>
          </div>
        </div>
      )}

      {/* Results Found State */}
      {!isLoading && hasResults && (
        <div className="main__container">
          <h1 className="main__title">Search results</h1>
          <ul className="main__newscards-list">
            {articles.slice(0, visibleCount).map((article, index) => (
              <li key={index}>
                <NewsCard
                  article={article}
                  isSaved={isArticleSaved(article)}
                  isLoggedIn={isLoggedIn}
                  onSave={onSaveArticle}
                  onDelete={onDeleteArticle}
                  onSignInPrompt={onSignInClick}
                  isMainPage={true}
                />
              </li>
            ))}
          </ul>

          {hasMore && (
            <button onClick={handleShowMore} className="main__show-more-button">
              Show More
            </button>
          )}
        </div>
      )}

      {/* Error State */}
      {!isLoading && hasError && (
        <div className="main__container">
          <h1 className="main__title">Search results</h1>
          <div className="main__error-message">
            Sorry, something went wrong during the request. Please try again
            later.
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;
