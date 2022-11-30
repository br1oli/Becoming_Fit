import React from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import "react-json-pretty/themes/monikai.css";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  updateUserProfile,
  getUserProfileByEmail,
} from "../../Redux/Actions/UsersActions";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Logo from "../../Utils/Title.png";
import Footer from "../Footer/Footer";
import UserMenu from "../NavBar/UserMenu/UserMenu";
import Loading from "../../Utils/Loading.gif";
import Style from "./user-info.module.css";

function validador(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Required";
  } else if (!/^[A-Z][a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
    errors.name = "First letter must be uppercase";
  }
  if (!input.zipCode) {
    errors.zipCode = "Required";
  } else if (!/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(input.zipCode)) {
    errors.zipCode = "First letter must be uppercase";
  }
  if (!input.country) {
    errors.country = "Required";
  } else if (!/^[A-Z][a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.country)) {
    errors.country = "First letter must be uppercase";
  }
  if (!input.city) {
    errors.city = "Required";
  } else if (!/^[A-Z][a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.city)) {
    errors.city = "First letter must be uppercase";
  }
  if (!input.phone) {
    errors.phone = "Required";
  } else if (!/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(input.phone)) {
    errors.phone = "First letter must be uppercase";
  }
  if (!input.adress) {
    errors.adress = "Required";
  } else if (!/^[A-Z][a-zA-ZÀ-ÿ\s]{1,500}$/.test(input.adress)) {
    errors.adress = "First letter must be uppercase";
  }
  return errors;
}

// name: "",
//     zipCode: "",
//     country: "",
//     city: "",
//     phone: "",
//     adress: "",

const Profile = () => {
  const { loginWithRedirect, isAuth } = useAuth0();
  const hist = useHistory();

  useEffect(() => {
    const redireccionar = async () => {
      try {
        if (isAuth) {
          hist.push("/home");
        } else {
          console.log("NO ESTA AUTENTICADO");
        }
      } catch (error) {
        console.log(error);
      }
    };
    redireccionar();
  });

  const usuarios = useSelector((state) => state.userProfile);

  useEffect(() => {
    const data = async () => {
      try {
        if (user) {
          await dispatch(getUserProfileByEmail(usuarios.email));
        }
      } catch (error) {
        console.log(error);
      }
    };
    data();
    setTimeout(() => {}, 3000);
  }, []);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const generarToken = async () => {
      try {
        if (isAuthenticated === true) {
          user.roles = user ? "admin" : null;
          await dispatch(getUserProfileByEmail(user.email));
        } else {
          console.log("no");
        }
        const tokenApi = await getAccessTokenSilently();
        setToken(tokenApi);
      } catch (error) {
        console.log(error);
      }
    };
    generarToken();
  }, [user]);

  const [isLoading, setIsLoading] = useState(true);

  const [input, setInput] = useState({
    name: "",
    zipCode: "",
    country: "",
    city: "",
    phone: "",
    adress: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    zipCode: "",
    country: "",
    city: "",
    phone: "",
    adress: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let errorObj = validador({ ...input, [e.target.name]: e.target.value });
    setErrors(errorObj);
  }

  const Cargando = async () => {
    setTimeout(() => {
      setIsLoading(false);
      alert("Informacion cargada con exito!");
      setInput({
        name: "",
        zipCode: "",
        adress: "",
        city: "",
        country: "",
        phone: "",
      });
    }, 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !input.name ||
      !input.adress ||
      !input.country ||
      !input.city ||
      !input.zipCode ||
      !input.phone
    ) {
      return alert("Incompletes fields.");
    }
    await dispatch(getUserProfileByEmail(user.email));
    await dispatch(updateUserProfile(usuarios.email, input));
    await Cargando();
    setInput({
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
  };

  useEffect(() => {
    const data = async () => {
      try {
        if (user) {
          await dispatch(getUserProfileByEmail(usuarios.email));
        }
      } catch (error) {
        console.log(error);
      }
    };
    data();
    setTimeout(() => {}, 3000);
  }, []);

  const back = () => {
    // if(input.name.length ||
    // input.zipCode.length ||
    // input.adress.length ||
    // input.city.length ||
    // input.country.length ||
    // input.phone.length){
    //   alert("Are you sure you want to come back?, the data you have entered will be lost.")
    // }else{
    // }
    history.push("/complete");
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return isLoading === true ? (
    <div>
      <div className={Style.loading}>
        <img src={Loading} alt="not found" />
      </div>
    </div>
  ) : isAuthenticated ? (
    <div>
      <div className={Style.navContainer}>
        <img src={Logo} alt="not found" width={200} height={60} />
        <UserMenu />
      </div>
      <form className={Style.formContainer} onSubmit={(e) => handleSubmit(e)}>
        <div className={Style.profileImage}>
          <img src={user.picture} alt={user.name} width={150} height={150} />
        </div>
        <br />

        <div className={Style.inputsForm}>
          <div className={Style.lblInput}>
            <label>Email: </label>
            {usuarios && Object.values(usuarios)?.length && usuarios.email}:
          </div>

          <div className={Style.lblInput}>
            <label>Name: </label>

            {usuarios && Object.values(usuarios)?.length && usuarios.name}

            <div>
              <input
                value={input.name}
                type="text"
                name="name"
                placeholder="Change your name..."
                onChange={handleChange}
              />
              {errors?.name ? (
                <div className={Style.danger}>{errors.name}</div>
              ) : null}
            </div>
          </div>

          <div className={Style.lblInput}>
            <label>Country:</label>
            {usuarios.country}
            <div>
              <input
                value={input.country}
                type="text"
                name="country"
                placeholder="Change your country..."
                onChange={handleChange}
              />
              {errors?.country ? (
                <div className={Style.danger}>{errors.country}</div>
              ) : null}
            </div>
          </div>

          <div className={Style.lblInput}>
            <label>City:</label>
            {usuarios.city}
            <div>
              <input
                value={input.city}
                type="text"
                name="city"
                placeholder="Change your city..."
                onChange={handleChange}
              />
              {errors?.city ? (
                <div className={Style.danger}>{errors.city}</div>
              ) : null}
            </div>
          </div>

          <div className={Style.lblInput}>
            <label>Zip Code:</label>
            {usuarios.zipCode}
            <div>
              <input
                value={input.zipCode}
                type="number"
                name="zipCode"
                placeholder="Change your zip code..."
                onChange={handleChange}
              />
              {errors?.zipCode ? (
                <div className={Style.danger}>{errors.zipCode}</div>
              ) : null}
            </div>
          </div>

          <div className={Style.lblInput}>
            <label>Phone:</label>
            {usuarios.phone}
            <div>
              <input
                value={input.phone}
                type="number"
                name="phone"
                placeholder="Change your phone..."
                onChange={handleChange}
              />
              {errors?.phone ? (
                <div className={Style.danger}>{errors.phone}</div>
              ) : null}
            </div>
          </div>

          <div className={Style.lblInput}>
            <label>Adress:</label>
            {usuarios.adress}
            <div>
              <input
                value={input.adress}
                type="text"
                name="adress"
                placeholder="Change your adress..."
                onChange={handleChange}
              />
              {errors?.adress ? (
                <div className={Style.danger}>{errors.adress}</div>
              ) : null}
            </div>
          </div>

          <br />

          <div className={Style.buttons}>
            <button className={Style.submit} onClick={back}>
              Volver
            </button>
            <button className={Style.submit} type="submit">
              Save
            </button>
            <br />
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className={Style.noAuth}>
      <img src={Logo} alt="not found" width={240} height={80} />
      <div className={Style.noAuthBody}>
        <h1>You need to be authenticated to enter here</h1>
        <div className={Style.noAuthButtons}>
          <div
            onClick={() =>
              loginWithRedirect({ appState: { returnTo: "/home" } })
            }
            className={Style.noAuthLinks}
          >
            Login
          </div>
          <Link>
            <h5 className={Style.noAuthLinks}>Go Home</h5>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
