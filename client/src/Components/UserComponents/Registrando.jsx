import React from "react";
import firebaseApp from "../../credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import Login from "./Login";
import { NavLink } from "react-router-dom";
import { Button, Form, Container, Stack } from "react-bootstrap";


const auth = getAuth(firebaseApp);
//provedores:
const googleProvider = new GoogleAuthProvider();

export const Registrando = () => {

  const submitHandler = async (e) => {
    e.preventDefault();
    const correo = e.target.formBasicEmail.value;
    const contra = e.target.formBasicPassword.value;
      // si esta iniciando seccion:
      createUserWithEmailAndPassword(auth, correo, contra);
    };

  return (
    <Container>
      <Stack gap={3}>
        <h1 className="font-weight-bold">
          Sign Up!
        </h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Label>First name</Form.Label>
            <Form.Control type="email" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="email" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <NavLink to='/home'>
          <Button variant="dark" type="submit">
            Sign Up
          </Button>
        </NavLink>
        <NavLink to='/'>
          <Button variant="dark" type="submit">
            Volver
          </Button>
          </NavLink>
        </Form>

        <NavLink to='/home'>
        <Button
          variant="primary"
          type="submit"
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          Sign Up with Google
        </Button>
        </NavLink>
        <NavLink to= "/signin">
        You already have a account? Sign in!
        </NavLink>

      </Stack>
    </Container>
  );
};

export default Registrando