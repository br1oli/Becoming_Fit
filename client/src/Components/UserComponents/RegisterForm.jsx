import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./RegisterForm.module.css";

export function RegisterForm() {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zipCode: "",
    telephone: "",
    image: "",
    address: "",
  });

  function validate(input) {
    let errors = {};
    if (!input.userName) {
      errors.userName = "Enter a username ";
    } else if (!input.firstName) {
      errors.firstName = "Enter a first name";
    } else if (!input.lastName) {
      errors.lastName = "Enter a last name";
    } else if (!input.email) {
      errors.email = "Enter a email";
    } else if (!input.address) {
      errors.address = "Enter a adress";
    } else if (!input.password) {
      errors.password = "Enter a password";
    } else if (!input.zipCode) {
      errors.zipCode = "Enter a zip code";
    } else if (!input.telephone) {
      errors.telephone = "Enter a phone number";
    } else if (!input.image) {
      errors.image = "Enter a URL image";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !input.userName ||
      !input.firstName ||
      !input.lastName ||
      !input.email ||
      !input.password ||
      !input.zipCode ||
      !input.telephone ||
      !input.image ||
      !input.address
    ) {
      return alert("Incomplete fields.");
    }
    setInput({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      zipCode: "",
      telephone: "",
      image: "",
      address: "",
    });
    alert("Product created!");
    history.push("/home");
  };

  return (
    <div className={Styles.signInContainer}>
      <h1 className={Styles.titleContainer}> Sign Up </h1>

      <form className={Styles.formOrder} onSubmit={(e) => handleSubmit(e)}>
        <div className={Styles.form}>
          <input
            type="text"
            value={input.userName}
            name="userName"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>USERNAME</span>{" "}
          </label>
        </div>
        {errors.userName && <p className="error">{errors.userName}</p>}

        <div className={Styles.form}>
          <input
            type="text"
            value={input.firstName}
            name="firstName"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>FIRST NAME</span>{" "}
          </label>
        </div>
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <div className={Styles.form}>
          <input
            type="text"
            value={input.lastName}
            name="lastName"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>LAST NAME</span>{" "}
          </label>
        </div>
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <div className={Styles.form}>
          <input
            type="text"
            value={input.email}
            name="email"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>EMAIL</span>{" "}
          </label>
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className={Styles.form}>
          <input
            type="address"
            value={input.address}
            name="address"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>ADRESS</span>{" "}
          </label>
        </div>
        {errors.address && <p className="error">{errors.address}</p>}

        <div className={Styles.form}>
          <input
            type="password"
            value={input.password}
            name="password"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>PASSWORD</span>{" "}
          </label>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        <div className={Styles.form}>
          <input
            type="text"
            value={input.zipCode}
            name="zipCode"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>ZIP CODE</span>{" "}
          </label>
        </div>
        {errors.zipCode && <p className="error">{errors.zipCode}</p>}

        <div className={Styles.form}>
          <input
            type="text"
            value={input.telephone}
            name="telephone"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>TELEPHONE</span>{" "}
          </label>
        </div>
        {errors.telephone && <p className="error">{errors.telephone}</p>}

        <div className={Styles.form}>
          <input
            type="text"
            value={input.image}
            name="image"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          <label className={Styles.lblNombre}>
            <span className={Styles.textNomb}>IMAGE</span>{" "}
          </label>
        </div>
        {errors.image && <p className="error">{errors.image}</p>}
        <div>
          <button type="submit">Create User!</button>
          <button> Cancel </button>
        </div>
      </form>
    </div>
  );
}
