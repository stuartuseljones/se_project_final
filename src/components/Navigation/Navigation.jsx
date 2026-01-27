import React from "react";
import "./Navigation.css";

import LogoutIcon from "../../assets/logout.svg";
import MenuIcon from "../../assets/menu_lines.svg"; // Add your menu icon here
import CloseIcon from "../../assets/closebutton.svg"; // Close icon

import { Link } from "react-router-dom";
import { useState } from "react";

function Navigation({
  isLoggedIn,
  onSignInClick,
  onLogout,
  currentUser,
  isMainPage,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`navbar ${!isMainPage && isLoggedIn ? "navbar--logged-in" : "navbar--logged-out"}`}
    >
      <div
        className={`navbar__title ${isLoggedIn && !isMainPage ? "navbar__title--logged-in" : "navbar__title--logged-out"}`}
      >
        NewsExplorer
      </div>
      <div className="navbar__links">
        <Link
          to="/"
          className={
            isLoggedIn && !isMainPage
              ? " navbar__home--logged-in"
              : " navbar__home--logged-out"
          }
        >
          Home
        </Link>
        {isLoggedIn && (
          <div className="navbar__logged-in-section">
            <Link
              to="/saved-news"
              className={`navbar__saved-articles-button ${isLoggedIn && isMainPage ? "navbar__saved-articles-button--light" : ""}`}
            >
              Saved Articles
            </Link>
            <button
              onClick={() => {
                onLogout();
              }}
              className={`navbar__signout-button ${isLoggedIn && isMainPage ? "navbar__signout-button--light" : ""}`}
            >
              {currentUser?.name || "User"}
              <img
                className={`navbar__signout-icon ${isLoggedIn && isMainPage ? "navbar__signout-icon--light" : ""}`}
                src={LogoutIcon}
                alt="logout icon"
              />
            </button>
          </div>
        )}
        {!isLoggedIn && isMainPage && (
          <button onClick={onSignInClick} className="navbar__signin-button">
            Sign In
          </button>
        )}

        {/* Mobile menu button */}
        <button className="navbar__menu-button" onClick={toggleMobileMenu}>
          <img
            className={
              !isMainPage ? "navbar__menu-icon--light" : "navbar__menu-icon"
            }
            src={MenuIcon}
            alt={"menu"}
          />
          {isMobileMenuOpen && (
            <button className="navbar__close-button">
              <img className="navbar__close-icon" src={CloseIcon} alt="close" />
            </button>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="navbar__mobile-menu"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="navbar__mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              to="/"
              className="navbar__mobile-home"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            {!isLoggedIn && (
              <button
                onClick={() => {
                  onSignInClick();
                  setIsMobileMenuOpen(false);
                }}
                className="navbar__mobile-signin"
              >
                Sign In
              </button>
            )}
            {isLoggedIn && (
              <>
                <Link
                  to="/saved-news"
                  className="navbar__mobile-saved"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Saved Articles
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="navbar__mobile-signout"
                >
                  {currentUser?.name || "User"}
                  <img
                    className="navbar__mobile-signout-icon"
                    src={LogoutIcon}
                    alt="logout icon"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
