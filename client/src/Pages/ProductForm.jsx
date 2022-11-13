import React, { useEffect, useState } from "react";
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
import { filterUniqueBrand, filterUniqueCategories, filterUniqueGender, getProducts } from "../Redux/Actions/UsersActions";




function validador(input) {
    let errors = {};
    if(!input.name || !input.type || !input.price || !input.image || !input.brand || !input.color || !input.description || !input.size || !input.category || !input.rating){
        alert("formularios incompletos")
    }
    if (!input.name) {
        errors.name = "Requerido";
    } else if (!/^[A-Z][a-zA-Z0-9]{1,19}$/.test(input.brand)) {
        errors.name ="La primera letra debe estar en mayuscula";
    }
    if (!input.type) {
        errors.type = "Requerido";
    } else if (!/^[A-Z][a-zA-Z0-9]{1,19}$/.test(input.brand)) {
        errors.type ="La primera letra debe estar en mayuscula";
    }
    if (!input.description) {
        errors.description = "Requerido";
    } else if (!/^[A-Z][a-zA-Z0-9]{1,19}$/.test(input.brand)) {
        errors.description ="La primera letra debe estar en mayuscula";
    }
    if (!input.image) {
        errors.image = "Url Requerido";
    } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg)/.test(input.image)) {
        errors.image = "Debe ser una Url valida";
    }
    if (!input.color) {
        errors.model = "Requerido";
    } else if (input.model.length > 15) {
        errors.model =
        "El nombre del modelo es demasiado largo";
    }
    if (!input.price) {
        errors.price = "Requerido";
    } else if (input.price < 0 || input.price > 1000000) {
        errors.price = "Excede de limites razonables";
    }
    // if (!input.detail0) {
        //     errors.detail0 = "Requerido";
        // } else if (
            //     input.detail0.length > 15 ||
            //     input.detail0.length < 2
            // ) {
                //     errors.detail0 =
                //         "La especificacion es demasiado larga o corta";
                // }
                
        if (!input.detail1) {
            errors.detail1 = "Requerido";
        } else if (
            input.detail1.length > 15 || input.detail1.length < 2
        ) {
            errors.detail1 =
            "La especificacion es demasiado larga o corta";
    }
    
    if (!input.detail2) {
        errors.detail2 = "Requerido";
    } else if (
        input.detail2.length > 15 ||
        input.detail2.length < 2
        ) {
            errors.detail2 =
            "La especificacion es demasiado larga o corta";
        }
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
            rating: ""

        })
        
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
            rating: ""

        })

    


        const allProducts = useSelector((state)=> state.allProducts)
        const brandss = useSelector((state)=> state.brands)
        const categories = useSelector((state)=> state.categories)
        const gender = useSelector((state)=> state.uniqueGenero)
        
        useEffect(() => {
            dispatch(getProducts());
            dispatch(filterUniqueGender());
            dispatch(filterUniqueBrand());
            dispatch(filterUniqueCategories());
        }, []);
        
        
        const handleInputChange = (e) => {
            console.log(e.target.value, "valor")
            setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    console.log(input)
    
    return(
        <Container>
            <h1>Formulario de Carga</h1>
            <Card>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // handleSubmit();
                            }}
                            className="submitForm"
                            >
                            <div>
                            <Row>
                                    <Col>
                                        <FloatingLabel
                                        className="mb-3"
                                        controlId="floatingimage"
                                        label="Nombre"
                                        >
                                        <Form.Control
                                            type={"text"}
                                            value={input.name}
                                            name="name"
                                            onChange={handleInputChange}
                                        />
                                    {errors.name }
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                        className="mb-3"
                                        controlId="floatingimage"
                                        label="Tipo"
                                        >
                                        <Form.Control
                                            type={"text"}
                                            value={input.type}
                                            name="type"
                                            onChange={handleInputChange}
                                        />
                                        </FloatingLabel>
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
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingBrands"
                                            label="Género"
                                        >
                                            
                                                <Form.Select
                                                    name="gender"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value={"NULL"}>
                                                        Elegir
                                                    </option>
                                                    {gender?.map((e) => {
                                                        return (
                                                            <option
                                                                key={e}
                                                                value={e}
                                                                name="gender"
                                                            >
                                                                {e}
                                                            </option>
                                                        );
                                                    })}
                                                
                                                </Form.Select>
                                        </FloatingLabel>
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
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                        className="mb-3"
                                        controlId="floatingimage"
                                        label="Rating"
                                        >
                                        <Form.Select
                                                    name="rating"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value={"NULL"}>
                                                        Elegir
                                                    </option>

                                                            <option
                                                                key={1}
                                                                value={1}
                                                            >
                                                            ⭐
                                                            </option>
                                                            <option
                                                                key={2}
                                                                value={2}
                                                            >
                                                            ⭐⭐
                                                            </option>
                                                            <option
                                                                key={3}
                                                                value={3}
                                                            >
                                                            ⭐⭐⭐
                                                            </option>
                                                            <option
                                                                key={4}
                                                                value={4}
                                                            >
                                                            ⭐⭐⭐⭐
                                                            </option>
                                                            <option
                                                                key={5}
                                                                value={5}
                                                            >
                                                            ⭐⭐⭐⭐⭐
                                                            </option>
                                                
                                                </Form.Select>
                                        </FloatingLabel>
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
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingBrands"
                                            label="Marca"
                                        >
                                            
                                                <Form.Select
                                                    name="brand"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value={"NULL"}>
                                                        Elegir
                                                    </option>
                                                    {brandss?.map((e) => {
                                                        return (
                                                            <option
                                                                key={e}
                                                                value={e}
                                                                name="brand"
                                                            >
                                                                {e}
                                                            </option>
                                                        );
                                                    })}
                                                    <option value={""}>
                                                        Crear Marca
                                                    </option>
                                                </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                        
                                <FloatingLabel
                                    className="mb-3"
                                    controlId="floatingimage"
                                    label="Imagen"
                                    >
                                    <Form.Control
                                        type={"image"}
                                        value={input.image}
                                        name="image"
                                        onChange={handleInputChange}
                                    />
                                </FloatingLabel>
                                {errors.description}
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingCategoies"
                                            label="Categoría"
                                        >
                                            <Form.Select
                                                onChange={handleInputChange}
                                                name="category"
                                            >
                                                <option value={"NULL"}>
                                                    Elegir
                                                </option>
                                                {categories?.map((e) => {
                                                    return (
                                                        <option
                                                            key={e}
                                                            value={e}
                                                            name="category"
                                                        >
                                                            {e}
                                                        </option>
                                                    );
                                                })}
                                                <option value={""}>
                                                    Crear
                                                </option>
                                                
                                            </Form.Select>
                                        </FloatingLabel>
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
                                </FloatingLabel>
                                
                                <Button
                                    className="m-3"
                                    style={{ float: "right" }}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Card>
        </Container>
    )
}