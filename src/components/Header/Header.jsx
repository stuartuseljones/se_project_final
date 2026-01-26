import "./Header.css";

//component imports
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

import { useLocation } from "react-router-dom";

function Header({
  isLoggedIn,
  onSearch,
  onSignInClick,
  onLogout,
  currentUser,
  showSearch = true,
}) {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <header className="header">
      <Navigation
        isLoggedIn={isLoggedIn}
        isMainPage={isMainPage}
        onSignInClick={onSignInClick}
        onLogout={onLogout}
        currentUser={currentUser}
      />

      {showSearch && (
        <div className="header__content">
          <div className="header__text-container">
            <h1 className="header__title">
              What's going on in <br />
              the world?
            </h1>
            <p className="header__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>
          <SearchForm onSearch={onSearch} />
        </div>
      )}
    </header>
  );
}

export default Header;
