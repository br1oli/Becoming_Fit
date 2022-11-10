import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Style from './ProductCardsindex.css'

const ProductCard = () => {


        return (
            <div className="row" style={{width: '15rem'}}>
                <div className="col-sm-12 col-md-3 col-xl-3 col-xl-3">
                    <div  className="Contenedor">
                        <Card className="Card" style={{ width: '15rem' }}>
                            <Card.Img className="Imagen" variant="top" src="https://f.fcdn.app/imgs/07b461/www.globalsports.com.uy/gls/a9c6/webp/catalogo/NKCZ6376-010-1/460x460/campera-nike-drifit-fleece-hd-black.jpg" />
                            <Card.Body className="CardBody">
                                <Card.Title className="Title">Card Title</Card.Title>
                                <Card.Text className="Description">
                                    Brand
                                </Card.Text>
                                <Card.Text className="Price">
                                    US$ 700
                                </Card.Text>
                                <div className="buttons">
                                        <button className="add">Add to Cart</button>
                                        <button className="like"><span>♥</span></button>
                                    </div>

                            </Card.Body>
                        </Card>

                    </div>
                </div>
            </div>
        )
    
};


export default ProductCard;