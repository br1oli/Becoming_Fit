import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Styles from "./Style/About.module.css";

const About = () => {
  return (
    <div className={Styles.aboutContainer}>
      <div className={Styles.topContainer}>
        <Link to={"/home"}>
          <HomeIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
        </Link>
        <h1 className={Styles.title}>Becoming Fit</h1>
      </div>
      <div className={Styles.pharagraphContainer}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ut
          quasi, ipsam vel iure inventore exercitationem nam sit saepe
          accusantium maiores! Sit dolor quos aliquam magni aliquid facere iure
          reiciendis? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Architecto, nam numquam. Eos dolorem fugiat dolor veritatis beatae
          eius voluptatem consequuntur magni, laboriosam culpa. Aperiam, sunt.
          Eius quod nulla aut similique!
        </p>
      </div>
      <div className={Styles.colabsContainer}>
        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
            <h3>UN COLABORADOR</h3>
          </div>

          <div className={Styles.oneColabContainer}>
            <h3>UN COLABORADOR</h3>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
          </div>
        </div>

        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
            <h3>UN COLABORADOR</h3>
          </div>

          <div className={Styles.oneColabContainer}>
            <h3>UN COLABORADOR</h3>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
          </div>
        </div>

        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
            <h3>UN COLABORADOR</h3>
          </div>

          <div className={Styles.oneColabContainer}>
            <h3>UN COLABORADOR</h3>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
          </div>
        </div>

        <div className={Styles.twoColabsContainer}>
          <div className={Styles.oneColabContainer}>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
            <h3>UN COLABORADOR</h3>
          </div>

          <div className={Styles.oneColabContainer}>
            <h3>UN COLABORADOR</h3>
            <img
              className={Styles.imgContainer}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
              alt="not found"
              height={100}
              width={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
