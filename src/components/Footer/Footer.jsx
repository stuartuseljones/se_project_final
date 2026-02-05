import { Link } from "react-router-dom";
import "./Footer.css";

//Asset Imports
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/LinkedIn.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          © 2026 Stuart Useldinger Jones, Powered by News API
        </p>
        <div className="footer__links">
          <Link to="/" className="footer__link-text">
            Home
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://tripleten.com/"
            className="footer__link-text"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__link-icons">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/stuartuseljones"
            className="footer__link-icon"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/stuart-useldinger-jones/"
            className="footer__link-icon footer__link-linkedin"
          >
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>{" "}
      </div>
    </footer>
  );
}

export default Footer;
