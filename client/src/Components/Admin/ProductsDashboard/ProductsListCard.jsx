import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductDetail, deleteProduct, changeProductStock } from "../../../Redux/Actions/UsersActions";
import Card from "react-bootstrap/Card";
import './ProductsListCard.css';
import "bootstrap/dist/css/bootstrap.min.css";

const ProductsListCard = (props) => {
    let dispatch = useDispatch();
    let history = useHistory();

    const handleEditProduct = (e) => {
        dispatch(getProductDetail(e.target.value))
        setTimeout(() => {
          history.push("/admin/products/edit") 
        }, 1000)        
    }

    const handleDeleteProduct = async (e) => {
      if (props.isDeleted === false) {
        if (window.confirm("Are you sure you want to delete this product from the customers list?")) {
          dispatch(deleteProduct({id: e.target.value, changeDeleteState: true}));          
          window.location.reload()
        }
      } else if (props.isDeleted === true) {
        if (window.confirm("Are you sure you want to add this product from the customers list?")) {
          dispatch(deleteProduct({id: e.target.value, changeDeleteState: false}));          
          window.location.reload()
        }
      }        
    }

    const handleChangeStock = (e) => {
      if (props.outOfStock === false) {
        dispatch(changeProductStock({id: e.target.value, changeStock: true}))
        window.location.reload()
      } else {
      if (props.outOfStock === true) {
        dispatch(changeProductStock({id: e.target.value, changeStock: false}))
        window.location.reload()
        }
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
                  {props.outOfStock === false ? <p>Available Stock</p> : <p>Out of Stock</p>}
                <div className="buttons">
              <button
                  value={props.id}
                  onClick={handleChangeStock}
                  className="like"
              >
                  Change "Out of Stock" status
              </button>
          </div>
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
                  {
                    props.isDeleted === true ? 
                    <button
                    value={props.id}
                    onClick={handleDeleteProduct}
                    className="like"
                  >
                  ADD
                  </button> :
                  <button
                  value={props.id}
                  onClick={handleDeleteProduct}
                  className="like"
                >
                  DELETE
                </button>
                }                  
                </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      );
    };

export default ProductsListCard