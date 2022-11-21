import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./ProductCard.css";
import { addToCart, postCartToDB } from "../../Redux/Actions/UsersActions";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (props) => {
  let dispatch = useDispatch();
  let token = useSelector((state) => state.token);
  let userId = useSelector((state) => state.userStore);

  const handleChange = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(
        postCartToDB({ userId: userId.id, productId: props.id, amount: 1 })
      );
    } else {
      dispatch(addToCart(e.target.value));
    }
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
                <button value={props.id} className="add" onClick={handleChange}>
                  Add to Cart
                </button>
                <button className="like">
                  <span>♥</span>
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
