import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductsListCard from "./ProductsListCard";

const ProductsList = () => {

    let productsList = useSelector((state) => state.allProductsForAdmin);    
    
    let [input, setInput] = useState("");
    let [filter, setFilter] = useState(productsList)

    let list = productsList.slice(0, 10) // Reemplazar ambos por paginado 
    let filterList = filter.slice(0, 10) // y adicionar al return indicado

    function handleInputChange(e){
        e.preventDefault();
        setInput(e.target.value)
        handleSearch(input)
    }  

    function handleSearch (input) {
        productsList = productsList.filter(p => p.name.toLowerCase().includes(input.toLowerCase()))
        setFilter(productsList)
    }


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
                            type = "text" 
                            placeholder = "Search products by name" 
                            value = {input}
                            onChange = {e => handleInputChange(e)}
                        ></input>
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
                    {filterList.length > 0 ? // reemplazar por filter cuando tenga paginado
                    filterList.map((p) => (
                        <ProductsListCard 
                        key={p.id}
                        name={p.name}
                        id={p.id}
                        image={p.image}
                        price={p.price}
                        outOfStock={p.outOfStock}
                        isDeleted={p.isDeleted} 
                        />
                    )) :
                    list.map((p) => ( // reemplazar por productsList cuando tenga el paginado
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
