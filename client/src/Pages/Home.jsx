import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../Components/Style/Home.css";
import Filters from "../Components/Filters";

const Home = () => {
  return (
    <div className="home-container">
      <div className="nav.container">
        <NavBar />
      </div>
      <div className="filters-container">
        <Filters />
      </div>
      <div className="cards-container">
        <h2>CARDS</h2>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
