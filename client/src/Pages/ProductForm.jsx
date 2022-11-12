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
import { filterUniqueBrand, filterUniqueCategories, getProducts } from "../Redux/Actions/UsersActions";




function validador(input) {
    let errors = {};
    if (!input.img) {
        errors.img = "Url Requerido";
    } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg)/.test(input.img)) {
        errors.img = "Debe ser una Url valida";
    }
    if (!input.category) {
        errors.category = "Requerido";
    } else if (!/^[A-Z \d\W]+$/.test(input.category)) {
        errors.category =
            "Toda la palabra debe estar en mayuscula";
        }
        if (!input.brand) {
            errors.brand = "Requerido";
        } else if (!/^[A-Z][a-zA-Z0-9]{1,19}$/.test(input.brand)) {
            errors.brand ="La primera letra debe estar en mayuscula";
        }
        if (!input.model) {
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
                    input.detail1.length > 15 ||
        input.detail1.length < 2
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
            category: "",
            price: "",
            img: "",
            brand: "",
        })
    


        const allProducts = useSelector((state)=> state.allProducts)
        const brandss = useSelector((state)=> state.brands)
        const categories = useSelector((state)=> state.categories)
        useEffect(() => {
            dispatch(getProducts());
            dispatch(filterUniqueBrand());
            dispatch(filterUniqueCategories())
        }, [dispatch]);
        
        
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
                                <FloatingLabel
                                    className="mb-3"
                                    controlId="floatingImg"
                                    label="Imagen"
                                    >
                                    <Form.Control
                                        type={"img"}
                                        value={input.img}
                                        name="img"
                                        onChange={handleInputChange}
                                    />
                                </FloatingLabel>
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
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingModel"
                                            label="Modelo"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type={"model"}
                                                name={"model"}
                                                onChange={handleInputChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingPrice"
                                            label="Precio"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type={"price"}
                                                name={"price"}
                                                onChange={handleInputChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
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