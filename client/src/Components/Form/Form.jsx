import { React, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "../../Utils/Loading.gif";
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Styles from './Form.module.css'
import {
  createUserProfile,
  clearCart,
  paymentOrder,
  getUserProfileByEmail,
} from "../../Redux/Actions/UsersActions";
import { deleteStorage } from "../../localStorage/localStorageFunctions";

const FormComplete = () => {
  const usuarios = useSelector((state) => state.userProfile);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  let paymentLink = useSelector((state) => state.paymentLink);

  const [input, setInput] = useState({
    name: "",
    email: "",
    zipCode: "",
    country: "",
    city: "",
    phone: "",
    adress: "",
  });

  useEffect(() => {
    const relleno = async () => {
      try {
        if (isAuthenticated) {
          setInput({
            ...input,
            name: user.name,
            email: user.email,
          });
        } else {
          console.log("NO ESTA AUTENTICADO");
        }
      } catch (error) {
        console.log(error);
      }
    };
    relleno();
  }, [user]);

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Enter a name";
    } else if (!input.country) {
      errors.genres = "Enter a valid country";
    } else if (!input.city) {
      errors.platforms = "Enter a valid city";
    } else if (!input.zipCode) {
      errors.platforms = "Enter your zip code ";
    } else if (!input.adress) {
      errors.platforms = "Enter a valid adress";
    } else if (!input.phone) {
      errors.platforms = "Enter a valid phone number";
    }
    if (Object.entries(errors).length === 0) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }

    return errors;
  }

  const Cargando = async () => {
    setTimeout(() => {
      setIsLoading(false);
      setInput({
        name: "",
        email: "",
        zipCode: "",
        adress: "",
        city: "",
        country: "",
        phone: "",
      });
      /*  history.push("/paymentDetails"); */
    }, 3000);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !input.name ||
      !input.adress.length ||
      !input.country ||
      !input.email ||
      !input.city ||
      !input.zipCode ||
      !input.phone ||
      !input.adress
    ) {
      return alert("Incompletes fields.");
    } else {
      setButtonEnabled(true);
      dispatch(createUserProfile(input));
      dispatch(getUserProfileByEmail(user.email));
      dispatch(paymentOrder(user.email));
      alert("Your data has been sent...");
      await Cargando();
      history.push("/formpayment");
    }

    // useEffect(()=> {
    // })
  };
  const volver = (e) => {
    e.preventDefault(e);

    history.push("/home");
  };

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

  return isLoading === true ? (
    <div>
      <div>
        <img src={Loading} alt="not found" />
      </div>
    </div>
  ) : (
    isAuthenticated && (
      <div className={Styles.totalConainer}>
        <div>
          <Navbar />
        </div>

      <div className={Styles.formContainer}>
      <form
       onSubmit={(e) => handleSubmit(e)}
       className={Styles.formStyled}
       >
        <div className={Styles.lblInput}>
          <label>Enter your name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese su nombre..."
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div >
          <label>Email:</label>
          <label>{user.email}</label>
        </div>
        <div>{usuarios.phone}</div>
        <div className={Styles.lblInput}>
          <label> Enter a phone number</label>
          <input
            type="text"
            value={input.phone}
            name="phone"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            placeholder="Enter your phone number..."
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div>{usuarios.country}</div>
        <div className={Styles.lblInput}>
          <label>Enter a country</label>
          <input
            type="text"
            value={input.country}
            name="country"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese su pais..."
          />
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
        <div>{usuarios.city}</div>
        <div className={Styles.lblInput}>
          <label>Enter a city</label>
          <input
            type="text"
            value={input.city}
            name="city"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese su ciudad"
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div>{usuarios.adress}</div>
        <div className={Styles.lblInput}>
          <label>Enter your adress</label>
          <input
            type="text"
            value={input.adress}
            name="adress"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            placeholder="Describa el juego..."
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>{usuarios.zipCode}</div>
        <div className={Styles.lblInput}>
          <label>Enter your zip code </label>
          <input
            type="text"
            value={input.zipCode}
            name="zipCode"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            placeholder="Describa el juego..."
          />
          {errors.zipCode && <p className="error">{errors.zipCode}</p>}
        </div>
        <div className={Styles.button}>
          <div className={Styles.backButtonContainer}>
            <button className={Styles.backButton} onClick={volver}>Back </button>
          </div>

        {!usuarios.country && !usuarios.adress && !usuarios.zipCode ? (
          <button className={Styles.backButton} type="submit">
            Save
          </button>
        ) : (
          <button type="submit" className={Styles.backButton}>
            <a href={paymentLink}>Go to Pay!</a>
          </button>
        )}
        </div>
      </form>
      </div>
      <div className={Styles.footer}>
        <Footer />
      </div>
      </div>
    )
  );
};

export default FormComplete;
