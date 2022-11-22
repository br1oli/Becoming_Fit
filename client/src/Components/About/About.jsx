import React from "react";
import Styles from "./About.module.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Footer from "../Footer/Footer";
import BProfile from "../../Utils/Braian.png";
import MProfile from "../../Utils/Mica.png";
import BruProfile from "../../Utils/Bruno.png";
import JProfile from "../../Utils/Jess.png";
import TProfile from "../../Utils/Tomas.png";
import LProfile from "../../Utils/Luciano.png";
import IProfile from "../../Utils/Ivo.png";
import title from "../../Utils/Title.png";
import logo from "../../Utils/LogoFondoBlanco.png";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const About = () => {
  return (
    <div className={Styles.aboutContainer}>
      <div className={Styles.topContainer}>
        <img src={logo} alt="not found" className={Styles.logo} />
        <img src={title} alt="not found" width={240} height={80} />
        <Link to={"/home"}>
          <FaHome style={{ fontSize: 35, color: "#f5f5f5" }} />
        </Link>
      </div>
      <div className={Styles.pharagraphContainer}>
        <p>
          Aplicación desarrollada por equipo de estudiantes de SoyHenry® <br />
          Implementacion de JavaScript - NodeJS - Express - React - Redux -
          Bootstrap - Material UI - Auth 0 - Vercell
        </p>
      </div>
      <div className={Styles.colabsContainer}>
        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src={BProfile}
              alt="not found"
              height={120}
              width={120}
            />
            <div className={Styles.bodyContainer}>
              <div className={Styles.titleContainer}>
                <h3>BRAIAN VERON</h3>
                <h5>Buenos Aires, Argentina</h5>
              </div>
              <div className={Styles.linksContainer}>
                <Link to="https://github.com/braiveron">
                  <BsGithub size={30} />
                </Link>
                <Link to="https://linkedin.com/in/braianveron">
                  <BsLinkedin size={30} />
                </Link>
              </div>
            </div>
          </div>

          <div className={Styles.oneColabContainer}>
            <div className={Styles.bodyContainer}>
              <div className={Styles.titleContainer}>
                <h3>TOMAS BARTOLDI</h3>
                <h5>Buenos Aires, Argentina</h5>
              </div>
              <div className={Styles.linksContainer}>
                <Link to="https://github.com/TomasBartoldi">
                  <BsGithub size={30} />
                </Link>
                <Link to="https://www.linkedin.com/in/tomas-bartoldi-395818242/">
                  <BsLinkedin size={30} />
                </Link>
              </div>
            </div>
            <img
              className={Styles.imgContainer}
              src={TProfile}
              alt="not found"
              height={120}
              width={120}
            />
          </div>
        </div>

        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src={MProfile}
              alt="not found"
              height={120}
              width={120}
            />
            <div className={Styles.bodyContainer}>
              <div className={Styles.titleContainer}>
                <h3>MICAELA CEBALLOS</h3>
                <h5>Buenos Aires, Argentina</h5>
              </div>
              <div className={Styles.linksContainer}>
                <Link to="https://github.com/MicaCblls">
                  <BsGithub size={30} />
                </Link>
                <Link to="https://www.linkedin.com/in/micaela-ceballos-036b4a21b/">
                  <BsLinkedin size={30} />
                </Link>
              </div>
            </div>
          </div>

          <div className={Styles.oneColabContainer}>
            <div className={Styles.bodyContainer}>
              <div className={Styles.titleContainer}>
                <h3>LUCIANO MESSINA</h3>
                <h5>Tucuman, Argentina</h5>
              </div>
              <div className={Styles.linksContainer}>
                <Link to="https://github.com/lucianomessina">
                  <BsGithub size={30} />
                </Link>
                <Link to="https://www.linkedin.com/in/luciano-messina-2910a2243/">
                  <BsLinkedin size={30} />
                </Link>
              </div>
            </div>
            <img
              className={Styles.imgContainer}
              src={LProfile}
              alt="not found"
              height={120}
              width={120}
            />
          </div>
        </div>

        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src={BruProfile}
              alt="not found"
              height={120}
              width={120}
            />
            <div className={Styles.bodyContainer}>
              <div className={Styles.titleContainer}>
                <h3>BRUNO OLIVERA</h3>
                <h5>Montevideo, Uruguay</h5>
              </div>
              <div className={Styles.linksContainer}>
                <Link to="https://github.com/br1oli">
                  <BsGithub size={30} />
                </Link>
                <Link to="https://www.linkedin.com/in/bruno-olivera-40402321b/">
                  <BsLinkedin size={30} />
                </Link>
              </div>
            </div>
          </div>

          <div className={Styles.oneColabContainer}>
            <div className={Styles.bodyContainer}>
              <div className={Styles.titleContainer}>
                <h3>JESSICA FRANCO</h3>
                <h5>Cartagena, Colombia</h5>
              </div>
              <div className={Styles.linksContainer}>
                <Link to="https://github.com/jessicafrancos">
                  <BsGithub size={30} />
                </Link>
                <Link to="https://www.linkedin.com/in/jessica-franco-/">
                  <BsLinkedin size={30} />
                </Link>
              </div>
            </div>
            <img
              className={Styles.imgContainer}
              src={JProfile}
              alt="not found"
              height={120}
              width={120}
            />
          </div>
        </div>

        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src={IProfile}
              alt="not found"
              height={120}
              width={120}
            />
            <div className={Styles.bodyContainer}>
              <div className={Styles.titleContainer}>
                <h3>IVAN CONSORTE</h3>
                <h5>Buenos Aires, Argentina</h5>
              </div>
              <div className={Styles.linksContainer}>
                <Link to="https://github.com/AntilopeDisecado">
                  <BsGithub size={30} />
                </Link>
                <Link to="https://www.linkedin.com/in/ivan-consorte-b4a772249/">
                  <BsLinkedin size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
