import React from "react";
import { VscGithub } from "react-icons/vsc";
import { AiFillLinkedin } from "react-icons/ai";
import "./styling/footer.css";

const Footer = () => {
  return (
    <div className="footer-div">
      <a className="footer-links" href="https://github.com/Kadebt">
        <VscGithub />
      </a>
      <div className="vl"></div>
      <a
        className="footer-links"
        href="https://www.linkedin.com/in/kadethompson3/"
      >
        <AiFillLinkedin />
      </a>
    </div>
  );
};

export default Footer;
