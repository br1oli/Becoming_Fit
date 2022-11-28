import React from "react";
import { useDispatch } from "react-redux";
import { getProducts, deleteProduct } from "../../../Redux/Actions/UsersActions";
import Card from "react-bootstrap/Card";
import './ProductsListCard.css';
import "bootstrap/dist/css/bootstrap.min.css";

const ProductsListCard = (props) => {
    let dispatch = useDispatch();

    const handleEditProduct = (e) => {
        console.log(e.target.value)
        //history.push(/FORMULARIO) o capaz se puede resolver con un modal
    }

    const handleDeleteProduct = async (e) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          dispatch(deleteProduct(e.target.value));
          window.location.reload()
        }
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
                    DELETE
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