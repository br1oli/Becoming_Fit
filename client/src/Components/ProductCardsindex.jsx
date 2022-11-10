import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Style from './ProductCardsindex.css'

const ProductCard = (props) => {


        return (
            <div className="row" style={{width: '15rem'}}>
                <div className="col-sm-12 col-md-3 col-xl-3 col-xl-3">
                    <div  className="Contenedor">
                        <Card className="Card" style={{ width: '15rem' }}>
                            <Card.Img className="Imagen" variant="top" src={props.image} />
                            <Card.Body className="CardBody">
                                <Card.Title className="Title">{props.name}</Card.Title>
                                <Card.Text className="Description">
                                    {props.brand}
                                </Card.Text>
                                <Card.Text className="Price">
                                    {props.price}
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
