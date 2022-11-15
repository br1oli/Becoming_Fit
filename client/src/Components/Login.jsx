import { useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import firebaseApp from "../credenciales";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { NavLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const auth = getAuth(firebaseApp);
//provedores:
const googleProvider = new GoogleAuthProvider();

export const Login = () => {

  const submitHandler = async (e) => {
    e.preventDefault();
    const correo = e.target.formBasicEmail.value;
    const contra = e.target.formBasicPassword.value;
      // si esta iniciando seccion:
      signInWithEmailAndPassword(auth, correo, contra);
    };

  return (
    <Container>
      <Stack gap={3}>
        <h1 className="font-weight-bold">
          Sign In!
        </h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="dark" type="submit">
            Sign in
          </Button>
        </Form>
        <Button
          variant="primary"
          type="submit"
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          Sign in with Google
        </Button>
        <NavLink to={RegisterForm}>
        Don't you have a account? Sign up!
        </NavLink>

      </Stack>
    </Container>
  );
};