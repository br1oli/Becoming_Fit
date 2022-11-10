import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../Components/Style/Home.css";
import ProductCard from "../COMPONENTS/ProductCards/ProductCardsindex";
import { useSelector } from 'react-redux'
import { propTypes } from "react-bootstrap/esm/Image";

const Home = () => {

  const allProducts = useSelector((state)=> state.allProducts)

  // function handleOnFavorite(e){
  //   dispatch(agregarFav(e.target.value))
  // }

  return (
    <div className="home-container">
      <div className="nav.container">
        <NavBar />
      </div>
      <div className="cards-container">
        <div>
            {
              allProducts?.map((p)=> {
                return (
                  <div>
                      <Link>
                        <ProductCard 
                        name={p.name}
                        image={p.imagen} 
                        brand={p.brand} 
                        price={p.price}
                        onFavorite={p.onfavorite}
                        />
                      </Link>
                  </div>
                )
              })
            }
        </div>
        <ProductCard/>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
