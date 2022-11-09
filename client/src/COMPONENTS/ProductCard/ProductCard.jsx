import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Style from './ProductCard.module.css'



const ProductCard = () => {
    // json.map((e) => {
        // console.log("data", e)

    return (


        <div className="container">
            {/* <div className="row"> */}
                <div className="col-sm-12 col-md-3 col-xl-3 col-xl-3">
                    <Card className="Card" style={{ width: '18rem' }}>
                    <Button className="favorite" >☆</Button>
                        <Card.Img className="Imagen" variant="top" src="https://f.fcdn.app/imgs/07b461/www.globalsports.com.uy/gls/a9c6/webp/catalogo/NKCZ6376-010-1/460x460/campera-nike-drifit-fleece-hd-black.jpg" />
                        <Card.Body className="CardBody">
                            <Card.Title className="title">Card Title</Card.Title>
                            <Card.Text className="brand">
                                Brand
                            </Card.Text>
                            <Card.Text className="Price">
                                US$ 700
                            </Card.Text>
                            <Button className="button" variant="primary">Buy</Button>
                        </Card.Body>
                    </Card>
                </div>
            {/* </div> */}
        </div>
    )
    
};


export default ProductCard;




        // <div>
        //     <button className={style.close} onClick={props.onClose}>☆</button>
        //     <img src={props.image} alt={props.name} className={style.images} />
        //     <p className={style.name}>Product Name </p>
        //     <p className={style.brand}>Product brand </p>
        //     <p className={style.price}>Product price </p>
        // </div>



// <div className="container">
// <div className="images">
//     <img src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" />
// </div>

// <div className="product">
//     <p>Women's Running Shoe</p>
//     <h1>Nike Epic React Flyknit</h1>
//     <h2>$150</h2>
//     <p className="desc">The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.</p>
//     <div className="buttons">
//     <button className="add">Add to Cart</button>
//     <button className="like"><span>♥</span></button>
//     </div>
// </div>
// </div>
