import "./Footer.css";

//Asset Imports
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/LinkedIn.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <p className="footer__text">
          © 2026 Stuart Useldinger Jones, Powered by News API
        </p>
        <div className="footer__links">
          <a href="#" className="footer__link-text">
            Home
          </a>
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
    </div>
  );
}

export default Footer;
