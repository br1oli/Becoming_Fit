import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import './ProductsListCard.css';
import "bootstrap/dist/css/bootstrap.min.css";

const ProductsListCard = (props) => {
    let dispatch = useDispatch();

    const handleEditProduct = (e) => {
        console.log(e.target.value)
    }

    const handleDeleteProduct = (e) => {
        console.log(e.target.value)
    }

    return (
        <div className="row" style={{ width: "15rem" }}>
          <div className="col-sm-12 col-md-3 col-xl-3 col-xl-3">
            <div className="Contenedor">
              <Card className="Card" style={{ width: "15rem" }}>                
                <Card.Img className="Image" variant="top" src={props.image} />                
                <Card.Body className="CardBody">
                  <Card.Title className="Title">{props.name}</Card.Title>   
                  <Card.Text className="Price">US {props.price}</Card.Text>
                  <div className="buttons">
                  <button
                    value={props.id}
                    onClick={handleEditProduct}
                    className="like"
                  >
                    EDIT
                  </button>
                </div>
                <div className="buttons">
                  <button
                    value={props.id}
                    onClick={handleDeleteProduct}
                    className="like"
                  >
                    PRODUCT
                  </button>
                </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      );
    };

export default ProductsListCard