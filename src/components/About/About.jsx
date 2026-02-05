import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__circle"></div>
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, I’m Stuart Useldinger Jones, a web developer focused on building
          clean, functional, and user-friendly websites. I work primarily with
          HTML, CSS, and JavaScript, and I’m comfortable turning design concepts
          into responsive, accessible interfaces. Through my training at
          TripleTen, I’ve strengthened my problem-solving skills and learned how
          to build projects from the ground up—planning structure, writing
          maintainable code, and iterating based on feedback. I value clear
          communication, thoughtful design, and practical solutions that
          actually serve users. I enjoy helping individuals and small businesses
          establish a strong web presence, whether that’s creating a new site
          from scratch or improving an existing one.
        </p>
      </div>
    </section>
  );
}

export default About;
