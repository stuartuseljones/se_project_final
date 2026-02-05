import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authorize, checkToken } from "../../utils/auth.js";
import { getItems } from "../../utils/api.js";
import { useEffect } from "react";

//Component imports
import SavedNews from "../SavedNews/SavedNews.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import About from "../About/About.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";

// API import
import newsApi from "../../utils/NewsApi.js";

import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);

  const handleSignInClick = () => {
    setActiveModal("login");
  };

  const handleSwitchToRegister = () => {
    setActiveModal("register");
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasError(false);
    setSearchKeyword(keyword);

    // Get dates for last 7 days
    const to = new Date().toISOString().split("T")[0];
    const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    newsApi
      .getNews(keyword, from, to)
      .then((data) => {
        setArticles(data.articles || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setHasError(true);
        setIsLoading(false);
      });
  };

  // Login handler
  function handleLogin(email, password) {
    setHasError(false);

    authorize(email, password)
      .then(({ token }) => {
        localStorage.setItem("token", token);
        return checkToken(token);
      })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        setActiveModal(""); // Close modal on success
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setHasError(true);
      });
  }

  // Register handler
  function handleRegister() {
    setHasError(false);

    // Simulate registration (you can enhance this later)
    setTimeout(() => {
      setActiveModal("success");
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.error("Error during token check:", err);
        localStorage.removeItem("token");
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    getItems()
      .then(setSavedArticles)
      .catch((err) => {
        console.error("Error fetching saved articles:", err);
        setHasError(true);
      });
  }, [isLoggedIn]);

  // Logout handler
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
  }

  // Save article handler
  function handleSaveArticle(article) {
    if (!isLoggedIn) return;

    // Transform article to match saved article format
    const articleToSave = {
      title: article.title,
      url: article.url,
      source: article.source.name,
      imageUrl: article.urlToImage,
      date: article.publishedAt,
      description: article.description,
      keyword: searchKeyword, // Add the search keyword
    };

    // Save to fake API
    import("../../utils/api.js").then(({ saveArticle }) => {
      saveArticle(articleToSave)
        .then((savedArticle) => {
          setSavedArticles((prev) => [savedArticle, ...prev]);
        })
        .catch((err) => {
          console.error("Error saving article:", err);
        });
    });
  }

  // Delete article handler
  function handleDeleteArticle(article) {
    import("../../utils/api.js").then(({ deleteArticle }) => {
      deleteArticle(article._id)
        .then(() => {
          setSavedArticles((prev) => prev.filter((a) => a._id !== article._id));
        })
        .catch((err) => {
          console.error("Error deleting article:", err);
        });
    });
  }

  // Check if article is saved
  function isArticleSaved(article) {
    return savedArticles.some((saved) => saved.url === article.url);
  }

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  onSearch={handleSearch}
                  onSignInClick={handleSignInClick}
                  onLogout={handleLogout}
                  currentUser={currentUser}
                  showSearch={true}
                />
                <Main
                  articles={articles}
                  isLoading={isLoading}
                  searchKeyword={searchKeyword}
                  hasError={hasError}
                  isLoggedIn={isLoggedIn}
                  onSaveArticle={handleSaveArticle}
                  onDeleteArticle={handleDeleteArticle}
                  isArticleSaved={isArticleSaved}
                  onSignInClick={handleSignInClick}
                />
                <About />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              isLoggedIn ? (
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    onSignInClick={handleSignInClick}
                    onLogout={handleLogout}
                    currentUser={currentUser}
                    showSearch={false}
                  />
                  <SavedNews
                    onDeleteArticle={handleDeleteArticle}
                    articles={savedArticles}
                    currentUser={currentUser}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        {/* <Preloader /> */}
        <Footer />
      </div>
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("")}
        onSubmit={handleLogin}
        onSwitchToRegister={handleSwitchToRegister}
        isLoading={isLoading}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal("")}
        onSubmit={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
        isLoading={isLoading}
      />
      <SuccessModal
        isOpen={activeModal === "success"}
        onClose={() => setActiveModal("")}
        onSignInClick={handleSwitchToLogin}
      />
    </div>
  );
}

export default App;
