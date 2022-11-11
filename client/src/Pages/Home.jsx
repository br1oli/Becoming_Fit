import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Styles from "../Components/Style/Home.module.css";
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "../Components/ProductCardsindex";
import { getAllProducts } from "../Redux/Actions/Actions";
import { products } from "../Redux/Reducer/products";



const Home = () => {
  const dispatch = useDispatch();

  
  useEffect(()=> {
    dispatch(getAllProducts());
  },[])
  
  const productos = useSelector((state) => state.products.allProducts)
  

  return (
    <div className={Styles.homeContainer}>
      <div className="nav.container">
        <NavBar />
      </div>
      <div className={Styles.cardsContainer}>
        {/* <div>
          {
            Products?.map((p)=> {
              return (
                <ProductCard id={p.id} image={p.image} brand={p.brand} price={p.price}/>
              )
            })
          }
        </div> */}
        {productos && productos.map((p)=> {
          return (
            <div>
              <ProductCard name={p.name} id={p.id} image={p.image} brand={p.brandName} price={p.price}/>

            </div>

          )

        })

        }
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
