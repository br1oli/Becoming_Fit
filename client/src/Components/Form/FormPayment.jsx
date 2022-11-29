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
} from "../../Redux/Actions/UsersActions";
import { deleteStorage } from "../../localStorage/localStorageFunctions";

const FormPayment = () => {
    const usuarios = useSelector((state) => state.userProfile);
    const history = useHistory();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    let paymentLink = useSelector((state) => state.paymentLink);
    console.log("🚀 ~ file: Form.jsx ~ line 26 ~ FormComplete ~ paymentLink", paymentLink)

    const [input, setInput] = useState({
        city: "",
        phone: "",
        adress: "",
    });

    useEffect(() => {
        const relleno = async () => {
            try {
                if (isAuthenticated) {
                    dispatch(getUserProfileByEmail(user.email))
                    console.log("AHORA SI ESTOY AUTENTICADO");
                    setInput({
                        ...input,
                        name: user.name,
                        email: user.email,
                        // zipCode: usuarios.zipCode? usuarios.zipCode: "",
                        // country: usuarios.country? usuarios.country: "",
                        // city: usuarios.city? usuarios.city: "",
                        // phone: usuarios.phone? usuarios.phone: "",
                        // adress: usuarios.adress? usuarios.adress: [],
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


    if (usuarios.adress && usuarios.phone) {
        console.log("usuarios adress ", usuarios.adress);
        console.log("usuarios phone ", usuarios.phone);
        // history.push(paymentLink)
        console.log("soyy payment", paymentLink)
        // window.location.href={...paymentLink}

    }

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Enter a name";
        } else if (!input.city) {
            errors.platforms = "Enter a valid city";
        } else if (!input.zipCode) {
            errors.platforms = "Enter your zip code ";
        } else if (!input.adress) {
            errors.platforms = "Enter a valid adress";
        } else if (!input.phone) {
            errors.platforms = "Enter a valid phone number";
    
        }
        return errors;
    }

    const Cargando = async () => {
        setTimeout(() => {
            setIsLoading(false);
            setInput({
                
                
                
                adress: "",
                city: "",
                
                phone: "",
            });
            /*  history.push("/paymentDetails"); */
        }, 3000);
    };

    setTimeout(() => {
        setIsLoading(false)
    }, 3000)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            input.adress.length < 1 ||
            !input.city ||
            !input.phone 
            ) {
                setButtonEnabled(true);
                return alert("Incompletes fields.");
            }
            dispatch(paymentOrder(user.email));
            setButtonEnabled(false);
            dispatch(createUserProfile(input));
            
            alert("Your data has been sent...");
            await Cargando();

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

    return (
        isLoading === true ? <div>
            <div>
                <img src={Loading} alt="not found" />
            </div>
        </div>
            :
            isAuthenticated && (
                <div>
                    <h3>
                    Enter the required data
                    </h3>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <div>
                                <label>{usuarios.phone}</label>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    value={input.phone}
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
                                    value={input.city}
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
                                    value={input.adress}
                                    name="adress"
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="enter your new address..."
                                />
                            {errors.description && <p className="error">{errors.description}</p>}
                            </div>
                        </div>
                        <button onClick={volver}>Back </button>
                        {paymentLink ? 
                        
                            <button type="submit" className="submit1" >
                                <a href={paymentLink} target="_blank">
                                    Go to Pay!
                                </a>
                            </button>
                            : null
                        }
                    </form>
                </div>
            )
    );
};


export default FormPayment;
