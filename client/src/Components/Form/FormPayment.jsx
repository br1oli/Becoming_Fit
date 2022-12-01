import { React, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "../../Utils/Loading.gif";
import {
  createUserProfile,
  clearCart,
  paymentOrder,
  getUserProfileByEmail,
  updateUserProfile,
} from "../../Redux/Actions/UsersActions";

const FormPayment = () => {
  const usuarios = useSelector((state) => state.userProfile);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [errors, setErrorspayment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  let paymentLink = useSelector((state) => state.paymentLink);

  useEffect(() => {
    const relleno = async () => {
      try {
        if (isAuthenticated) {
          dispatch(getUserProfileByEmail(user.email));
          dispatch(paymentOrder(user.email));
        } else {
          console.log("NO ESTA AUTENTICADO");
        }
      } catch (error) {
        console.log(error);
      }
    };
    relleno();
  }, [user]);

  const [inputpayment, setInputpayment] = useState({
    city: "",
    phone: "",
    adress: "",
  });

  // function validate(input) {
  //   let errors = {};
  //   if (!input.name) {
  //     errors.name = "Enter a name";
  //   } else if (!input.city) {
  //     errors.platforms = "Enter a valid city";
  //   } else if (!input.adress) {
  //     errors.platforms = "Enter a valid adress";
  //   } else if (!input.phone) {
  //     errors.platforms = "Enter a valid phone number";
  //   }
  //   return errors;
  // }

  const Cargando = async () => {
    setTimeout(() => {
      setIsLoading(false);
      setInputpayment({
        adress: "",
        city: "",
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
    /* if (
            !inputpayment.adress ||
            !inputpayment.city ||
            !inputpayment.phone 
            ) {
                // setButtonEnabled(false);
                // return alert("Incompletes fields.");
            }else{ */
    setButtonEnabled(true);
    dispatch(createUserProfile(inputpayment));
    await dispatch(updateUserProfile(usuarios.email, inputpayment));
    await Cargando();
    setInputpayment({
      name: "",
      zipCode: "",
      adress: "",
      city: "",
      country: "",
      phone: "",
    });

    // alert('Informacion actualizada con exito!')
    // history.push('/profile')
    window.location.reload();

    // useEffect(()=> {
    // })
  };
  const volver = (e) => {
    e.preventDefault(e);

    history.push("/home");
  };

  function handleChange(e) {
    setInputpayment({
      ...inputpayment,
      [e.target.name]: e.target.value,
    });

    // let errorObj = validate({
    //   ...inputpayment,
    //   [e.target.name]: e.target.value,
    // });
    // setErrorspayment(errorObj);
  }

  return isLoading === true ? (
    <div>
      <div>
        <img src={Loading} alt="not found" />
      </div>
    </div>
  ) : (
    isAuthenticated && (
      <div>
        <h3>Would you like to update your data for this purchase?</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>{usuarios.phone}</label>
            </div>
            <div>
              <input
                type="number"
                value={inputpayment.phone}
                name="phone"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                placeholder="Enter your new number..."
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <div>
              <label>{usuarios.city}</label>
            </div>
            <div>
              <input
                type="text"
                value={inputpayment.city}
                name="city"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                placeholder=" enter your new city"
              />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
          </div>

          <div>
            <div>
              <label>{usuarios.adress}</label>
            </div>
            <div>
              <input
                type="text"
                value={inputpayment.adress}
                name="adress"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                placeholder="enter your new address..."
              />
              {errors.description && (
                <p className="error">{errors.description}</p>
              )}
            </div>
          </div>
          <button onClick={volver}>Back </button>

          <button type="submit" className="submit1">
            Update info
          </button>

          <Button type="submit" disabled={buttonEnabled}>
            <a href={paymentLink}>Go to Pay!</a>
          </Button>
        </form>
      </div>
    )
  );
};

export default FormPayment;
