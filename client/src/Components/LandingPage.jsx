import React from "react";
import "./Style/LandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import { Container, Stack, Button, Form } from "react-bootstrap";
import { useState } from "react";


//FIREBASE
import firebaseApp from "../credenciales"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();

export default function LandingPage() {
  const [estaRegistrandose, setEstaRegistrandose] = useState(false)
  
  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const location = document.querySelector(target).offsetTop;
  }
    
    
  async function submitHandler(e) {
    e.preventDefault()
    const correo = e.target.formBasicEmail.value;
    const contra = e.target.formBasicPassword.value;
    if(estaRegistrandose){
        const usuario = await createUserWithEmailAndPassword(
            auth, 
            correo, 
            contra)
        console.log(usuario)
    }else{
        signInWithEmailAndPassword(auth,correo,contra)
    }
}
    
  const img =
    "https://images.ecestaticos.com/GYoqrhNGQVxkGDpZdVYyp_-4qe8=/0x0:1600x900/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F5c9%2Ffaf%2F59a%2F5c9faf59a7384ce1d07729dde9ae781c.jpg";
  const img2 =
    "https://http2.mlstatic.com/D_NQ_NP_2X_756701-MLU49508112613_032022-F.webp";
  const img3 =
    "https://m.media-amazon.com/images/I/71+kDhjbyXL._AC_UL1500_.jpg";
  const img4 =
    "https://m.media-amazon.com/images/I/51OKk9pvEHL._AC_UL1000_.jpg";

  return (
    <div className="container">
      <div className="row">
  
        <div className="form-position">
          <div className="form-container">
          <div className="formulario">

          <Container>
            <Stack gap={3}>
                <h1> {estaRegistrandose ? "Registrate" : "Inicia sesion"}</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {estaRegistrandose ? "Registrate" : "Inicia sesion"}
                    </Button>
                </Form>

              <NavLink to={'/home'}>


                <Button variant="primary" type="submit" onClick={()=>{signInWithRedirect(auth,googleProvider)}}> 
                    Acceder con Google
                </Button>
              </NavLink>

                <Button variant="primary" onClick={() => setEstaRegistrandose(!estaRegistrandose)}>
                    {estaRegistrandose ? "Ya tienes cuenta? Inicia sesion" : "No tienes cuenta? Registrate"}
                </Button>

            </Stack>

        </Container>
          </div>
      </div>
      </div>
      </div>
    </div>
  );

      }