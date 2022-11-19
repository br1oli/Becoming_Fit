import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../Redux/Actions/UsersActions";
import Style from "./ProductForm.module.css";

function validador(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Required";
  } else if (!/[^A-Z](?:^|\s)(\S{1,19})(?=$|[\s.,:;])/g.test(input.name)) {
    errors.name = "First letter must be uppercase";
  }
  if (!input.type) {
    errors.type = "Required";
  } else if (!/^[A-Z][a-zA-Z0-9]{1,19}$/.test(input.type)) {
    errors.type = "First letter must be uppercase";
  }
  if (!input.color) {
    errors.color = "Required";
  } else if (!/^[A-Z][a-zA-Z0-9]{1,19}$/.test(input.color)) {
    errors.color = "First letter must be uppercase";
  }
  if (!input.description) {
    errors.description = "Required";
  } else if (!/^[A-Z][a-zA-Z0-9]{1,19}$/.test(input.description)) {
    errors.description = "First letter must be uppercase";
  }

  if (!input.gender) {
    errors.gender = "Required";
  }
  if (!input.size) {
    errors.size = "Required";
  } else if (!/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(input.size)) {
    errors.size = "Size must be a number";
  }
  if (!input.rating) {
    errors.rating = "Required";
  }
  if (!input.price) {
    errors.price = "Required";
  } else if (!/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(input.price)) {
    errors.price = "Price must be a number";
  }
  if (!input.brand) {
    errors.brand = "Required";
  }
  if (!input.category) {
    errors.category = "Required";
  } else if (input.price < 0 || input.price > 1000000) {
    errors.price = "Exceeds reasonable limits";
  }
  if (!input.image) {
    errors.image = "Required";
  } else if (
    !/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
      input.image
    )
  ) {
    errors.image = "Invalid Url";
  }
  return errors;
}

export default function ProductForm() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    type: "",
    gender: "",
    price: "",
    image: "",
    brand: "",
    color: "",
    description: "",
    size: "",
    category: "",
    rating: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    type: "",
    gender: "",
    price: "",
    image: "",
    brand: "",
    color: "",
    description: "",
    size: "",
    category: "",
    rating: "",
  });

  const allProducts = useSelector((state) => state.allProducts);
  const brandss = [...new Set(allProducts.map((e) => e.brand.name))];
  const categories = [...new Set(allProducts.map((e) => e.category.name))];
  const gender = [...new Set(allProducts.map((e) => e.gender))];

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    let errorObj = validador({ ...input, [e.target.name]: e.target.value });
    setErrors(errorObj);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.type ||
      !input.color ||
      !input.gender ||
      !input.size ||
      !input.rating ||
      !input.price ||
      !input.brand ||
      !input.image ||
      !input.category ||
      !input.description
    ) {
      alert("Incomplete form");
    } else {
      dispatch(postProduct(input));
      setInput({
        name: "",
        type: "",
        gender: "",
        price: "",
        image: "",
        brand: "",
        color: "",
        description: "",
        size: "",
        category: "",
        rating: "",
      });
      alert("Product created!!");
    }
  }

  return (
    <div style={{ margin: 15 }}>
      <Container>
        <Card>
          <form className="submitForm">
            <div>
              <Row>
                <Col>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingimage"
                    label="Name"
                  >
                    <Form.Control
                      type={"text"}
                      value={input.name}
                      name="name"
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  {errors?.name ? (
                    <div className={Style.danger}>{errors.name}</div>
                  ) : null}
                </Col>
                <Col>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingimage"
                    label="Type"
                  >
                    <Form.Control
                      type={"text"}
                      value={input.type}
                      name="type"
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  {errors?.type ? (
                    <div className={Style.danger}>{errors.type}</div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingimage"
                    label="Color"
                  >
                    <Form.Control
                      type={"text"}
                      value={input.color}
                      name="color"
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  {errors?.color ? (
                    <div className={Style.danger}>{errors.color}</div>
                  ) : null}
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingBrands" label="Género">
                    <Form.Select name="gender" onChange={handleInputChange}>
                      <option value={"NULL"}>Choose</option>
                      {gender?.map((e) => {
                        return (
                          <option key={e} value={e} name="gender">
                            {e}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FloatingLabel>
                  {errors?.gender ? (
                    <div className={Style.danger}>{errors.gender}</div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingimage"
                    label="Size(cm)"
                  >
                    <Form.Control
                      type={"text"}
                      value={input.size}
                      name="size"
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  {errors?.size ? (
                    <div className={Style.danger}>{errors.size}</div>
                  ) : null}
                </Col>
                <Col>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingimage"
                    label="Rating"
                  >
                    <Form.Select name="rating" onChange={handleInputChange}>
                      <option value={"NULL"}>Choose</option>

                      <option key={1} value={1}>
                        ⭐
                      </option>
                      <option key={2} value={2}>
                        ⭐⭐
                      </option>
                      <option key={3} value={3}>
                        ⭐⭐⭐
                      </option>
                      <option key={4} value={4}>
                        ⭐⭐⭐⭐
                      </option>
                      <option key={5} value={5}>
                        ⭐⭐⭐⭐⭐
                      </option>
                    </Form.Select>
                  </FloatingLabel>
                  {errors?.rating ? (
                    <div className={Style.danger}>{errors.rating}</div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingimage"
                    label="Price"
                  >
                    <Form.Control
                      type={"text"}
                      value={input.price}
                      name="price"
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  {errors?.price ? (
                    <div className={Style.danger}>{errors.price}</div>
                  ) : null}
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingBrands" label="Marca">
                    <Form.Select name="brand" onChange={handleInputChange}>
                      <option value={"NULL"}>Choose</option>
                      {brandss?.map((e) => {
                        return (
                          <option key={e} value={e} name="brand">
                            {e}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FloatingLabel>
                  {errors?.brand ? (
                    <div className={Style.danger}>{errors.brand}</div>
                  ) : null}
                </Col>
              </Row>

              <FloatingLabel
                className="mb-3"
                controlId="floatingimage"
                label="Imagen"
              >
                <Form.Control
                  type={"text"}
                  value={input.image}
                  name="image"
                  onChange={handleInputChange}
                />
                {errors?.image ? (
                  <div className={Style.danger}>{errors.image}</div>
                ) : null}
              </FloatingLabel>

              <Row>
                <Col>
                  <FloatingLabel controlId="floatingCategoies" label="Category">
                    <Form.Select onChange={handleInputChange} name="category">
                      <option value={"NULL"}>Choose</option>
                      {categories?.map((e) => {
                        return (
                          <option key={e} value={e} name="category">
                            {e}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FloatingLabel>
                  {errors?.category ? (
                    <div className={Style.danger}>{errors.category}</div>
                  ) : null}
                </Col>
              </Row>
              <FloatingLabel
                className="mb-3"
                controlId="floatingimage"
                label="Description"
              >
                <Form.Control
                  type={"text"}
                  value={input.description}
                  name="description"
                  onChange={handleInputChange}
                />
                {errors?.description ? (
                  <div className={Style.danger}>{errors.description}</div>
                ) : null}
              </FloatingLabel>

              <Button
                className="m-3"
                style={{ float: "right" }}
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  );
}
