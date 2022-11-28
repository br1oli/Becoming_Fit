import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../Redux/Actions/UsersActions";
import ProductsListCard from "./ProductsListCard";

const ProductsList = () => {
    const dispatch = useDispatch();

    const productsList = useSelector((state) => state.allProducts)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    //HACER FUNCTION QUE HAGA EL FILTRADO POR CATEGORIAS 
      
    return (
        <section>
            <div>
                <h2>Products</h2>
                <div>
                    {/* ACÁ TIENE QUE IR EL LINK AL PRODUCTFORM */}
                    <Link> 
                        Create new
                    </Link>
                </div>
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
                    {productsList.map((p) => (
                        <ProductsListCard 
                        key={p.id}
                        name={p.name}
                        id={p.id}
                        image={p.image}
                        price={p.price} />
                    ))}
                </div>
            </div>
        </div>
        </section>        
    )
} 
export default ProductsList