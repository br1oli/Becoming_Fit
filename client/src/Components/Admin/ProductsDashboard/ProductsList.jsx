import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductsListCard from "./ProductsListCard";

const ProductsList = () => {
    const dispatch = useDispatch();

    const productsList = useSelector((state) => state.allProductsForAdmin);
    const list = productsList.slice(0,4);

    //HACER FUNCTION QUE HAGA EL FILTRADO POR CATEGORIAS 
      
    return (
        <section>
            <div>
                <h2>Products</h2>
                <div>
                    <Link to ="/admin/products/create"> 
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
                    {list.map((p) => (
                        <ProductsListCard 
                        key={p.id}
                        name={p.name}
                        id={p.id}
                        image={p.image}
                        price={p.price}
                        outOfStock={p.outOfStock}
                        isDeleted={p.isDeleted} 
                        />
                    ))}
                </div>
            </div>
        </div>
        </section>        
    )
} 
export default ProductsList