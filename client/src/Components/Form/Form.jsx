import { React, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actUser } from '../../Redux/Actions/UsersActions';
import { useSelector } from 'react-redux';
const FormComplete = () => {
    const {usuarios} = useSelector((state) => state)
    const history = useHistory()
    const dispatch = useDispatch()
    const { user, isAuthenticated } = useAuth0();
    const [errors, setErrors] = useState({});
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
                    console.log("AHORA SI ESTOY AUTENTICADO")
                    setInput({
                        ...input,
                        name: user.name,
                        email: user.email,
                        // zipCode: usuarios.zipCode? usuarios.zipCode: "",
                        // country: usuarios.country? usuarios.country: "",
                        // city: usuarios.city? usuarios.city: "",
                        // phone: usuarios.phone? usuarios.phone: "",
                        // adress: usuarios.adress? usuarios.adress: [],
                    })
                } else {
                    console.log('NO ESTA AUTENTICADO')
                }
            } catch (error) {
                console.log(error)
            }
        }
        relleno()
    }, [user])


    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Enter a name";
          } else if (!input.email) {
           errors.description = "Enter a valid email";
        }
        else if (!input.country) {
            errors.genres = "Enter a valid country";
        }
        else if (!input.city) {
            errors.platforms = "Enter a valid city";
        }
        else if (!input.zipCode) {
            errors.platforms = "Enter your zip code ";
        }
        else if (!input.adress) {
            errors.platforms = "Enter a valid adress";
        }
        else if (!input.phone) {
            errors.platforms = "Enter a valid phone number";
        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input.name || !input.adress || !input.country || !input.email || !input.city || !input.zipCode || !input.phone) {
            return alert('Incompletes fields.')
        }
        dispatch(actUser(input))
        setInput({
            name: '',
            email: '',
            zipCode: '',
            adress: "",
            city: "",
            country: "",
            phone: "",
        })
        console.log(user)
        alert('Informacion cargada con exito!')
        history.push('/profile')
    }
    const volver = (e) => {
        e.preventDefault(e)
        history.push('/home')
    }

    function handleChange(e) {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            }
            );
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        console.log(input)
    }


    return (
        isAuthenticated &&
        <form onSubmit={e => handleSubmit(e)}>
            <div>
                <label>Enter your name</label>
                <input
                    type="text"
                    value={input.name}
                    name="name"
                    autoComplete="off"
                    onChange={e => handleChange(e)}
                    placeholder="Ingrese su nombre..."
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div>
                <label>Email:</label>
                <label>{user.email}</label>
            </div>


            <div>
                <label> Enter a phone number</label>
                <input
                    type="number"
                    value={input.phone}
                    name="phone"
                    autoComplete="off"
                    onChange={e => handleChange(e)}
                    placeholder="Enter your phone number..."
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div>
                <label>Enter a country</label>
                <input
                    type="text"
                    value={input.country}
                    name="country"
                    autoComplete="off"
                    onChange={e => handleChange(e)}
                    placeholder="Ingrese su pais..."
                />
                {errors.country && <p className="error">{errors.country}</p>}
            </div>

            <div>
                <label>Enter a city</label>
                <input
                    type="text"
                    value={input.city}
                    name="city"
                    autoComplete="off"
                    onChange={e => handleChange(e)}
                    placeholder="Ingrese su ciudad"
                />
                {errors.city && <p className="error">{errors.city}</p>}
            </div>

            <div>
                <label>Enter your adress</label>
                <input
                    type="text"
                    value={input.adress}
                    name="adress"
                    autoComplete="off"
                    onChange={e => handleChange(e)}
                    placeholder="Describa el juego..."
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </div>

            <div>
                <label>Enter your zip code </label>
                <input
                    type="text"
                    value={input.zipCode}
                    name="zipCode"
                    autoComplete="off"
                    onChange={e => handleChange(e)}
                    placeholder="Describa el juego..."
                />
                {errors.zipCode && <p className="error">{errors.zipCode}</p>}
            </div>
            <button onClick={volver}>Back </button>
            <button className='submit1' type="submit">Update info</button>
        </form>
    )
}

export default FormComplete;

//