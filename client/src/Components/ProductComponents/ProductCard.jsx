import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./ProductCard.css";
import {
  addToCart,
  postCartToDB,
  addProductToFavorites,
} from "../../Redux/Actions/UsersActions";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (props) => {
  let dispatch = useDispatch();

  const handleFavorite = async (e) => {
    await dispatch(addProductToFavorites(e.target.value));
  };

  return (
    <div className="row" style={{ width: "15rem" }}>
      <div className="col-sm-12 col-md-3 col-xl-3 col-xl-3">
        <div className="Contenedor">
          <Card className="Card" style={{ width: "15rem" }}>
            <NavLink to={`/home/${props.id}`}>
              <Card.Img className="Image" variant="top" src={props.image} />
            </NavLink>
            <Card.Body className="CardBody">
              <Card.Title className="Title">{props.name}</Card.Title>
              <Card.Text className="Description">{props.brandName}</Card.Text>

              <Card.Text className="Price">US {props.price}</Card.Text>
              <div className="buttons">
                <button
                  value={props.id}
                  onClick={handleFavorite}
                  className="like"
                >
                  ♥
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
