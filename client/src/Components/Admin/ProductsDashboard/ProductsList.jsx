import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductsListCard from "./ProductsListCard";
import ProductListPagination from "./ProductListPagination"

const ProductsList = () => {

    let productsList = useSelector((state) => state.allProductsForAdmin); 

    let [input, setInput] = useState("");
    let [filter, setFilter] = useState("")

    //PAGINADO
    let [currentPage, setCurrentPage] = useState(1);
    let currentProducts;
    let currentFilterProducts;
    let totalPages = filter.length ?
    Math.ceil(filter.length / 10) :
    Math.ceil(productsList.length / 10);

    //setting current page
    currentProducts = productsList.slice(
      (currentPage- 1) * 10, //slice desde 9, a 19, la primera vez que entra a esta condicion current page vale 2, por eso el -1
      (currentPage- 1) * 10 + 10
    );

    currentFilterProducts = filter.slice(
        (currentPage- 1) * 10, 
        (currentPage- 1) * 10 + 10
      );

     //Change page
    const paginate = (number) => {
    setCurrentPage(currentPage + number);
    };        
    
    function handleInputChange(e){
        e.preventDefault();
        setInput(e.target.value)
        handleSearch(input)
    }  

    function handleSearch (input) {
        productsList = productsList.filter(p => p.name.toLowerCase().includes(input.toLowerCase()))
        setFilter(productsList)
        setCurrentPage(1)
    }

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
                        <option>Choose a type</option>
                        {/* Acá habria que renderizar las categorias y hacerlas elegibles */}
                    </select>
                </div>
                </div>
            </header>

            <div>
                <div>
                    {/* Acá hay que hacer el map y renderizar las cards */}
                    {filter.length > 0 ? 
                    currentFilterProducts.map((p) => (
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
                    currentProducts.map((p) => ( 
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
        <br />
            <ProductListPagination 
             totalPages={totalPages}
             paginate={paginate}
             currentPage={currentPage}
             setCurrentPage={setCurrentPage}
            />
        </div>
        </section>        
    )
} 
export default ProductsList
