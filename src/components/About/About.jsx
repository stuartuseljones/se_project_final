import "./About.css";

// Asset Import
import smileyface from "../../assets/smiley_face.svg";

function About() {
  return (
    <section className="about">
      <div className="about__circle">
        <img
          className="about__circle-smiley"
          src={smileyface}
          alt="Smiley Face"
        />
        <p className="about__circle-text">
          Placeholder image.
          <br /> Put an image of yourself here.
        </p>
      </div>
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know. You
          can also talk about your experience with TripleTen, what you learned
          there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
