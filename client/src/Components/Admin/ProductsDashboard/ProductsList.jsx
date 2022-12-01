import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminCards from "./AdminCards";
import ProductListPagination from "./ProductListPagination"
import './ProductsList.css'
import { IoAddCircleOutline } from 'react-icons/io5'


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
        <div className="products-container">
            <div className="top-row">
                <div className="title-container">
                    <h2>Products</h2>
                </div> 

                <div className="input-container">
                    <input  
                        type = "text" 
                        placeholder = "Search products by name" 
                        value = {input}
                        onChange = {e => handleInputChange(e)}
                    ></input>
                </div>

                <div className="create-container">
                    <div className="create-title">
                    Create new: 
                    </div>

                    <div>
                    <Link to ="/admin/products/create"> 
                         <IoAddCircleOutline size={40} />
                    </Link>
                    </div>

                </div>
                   


                <div className="select-container">
                   <select className="select-box"> 
                       <option>Choose a type</option>
     {/* Acá habria que renderizar las categorias y hacerlas elegibles */}
                   </select>
                </div>
                
            
            </div>



        <div className="bot-row">

            <div className="products-list">
                <div className="cards-box">
                    
                    {/* Acá hay que hacer el map y renderizar las cards */}
                    {filter.length > 0 ? 
                    currentFilterProducts.map((p) => (
                        

                            <AdminCards 
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
                        <AdminCards 
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
        <div className="pagination-container">
            <ProductListPagination 
             totalPages={totalPages}
             paginate={paginate}
             currentPage={currentPage}
             setCurrentPage={setCurrentPage}
            />
        </div>
        </div>
        </div>        
    )
} 
export default ProductsList
