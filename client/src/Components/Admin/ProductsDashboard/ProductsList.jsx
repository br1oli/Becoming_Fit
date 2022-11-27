import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../Redux/Actions";
// import ProductCard from "./ProductCard";
// REALIZAR EL COMPONENTE ANTES DE DESCOMENTAR

const ProductsList = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.allProducts)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    
    return (
        <section>
            <div>
                <h2>Products</h2>
                <di>
                    <Link>
                        Create new
                    </Link>
                </di>
            </div>

        <div>
            <header>
                <div>
                    <div>
                        <input
                            type="search"
                            placeholder="Search a product ..." 
                        />
                    </div>
                <div>
                    <select> 
                        <option>Choose a category</option>
                        {/* Acá habria que renderizar las categorias y hacerlas elegibles */}
                    </select>
                </div>
                </div>
            </header>

            <div>
                <div>
                    {/* Acá hay que hacer el map y renderizar las cards */}
                </div>
            </div>

        </div>


        </section>

        
    )
} 