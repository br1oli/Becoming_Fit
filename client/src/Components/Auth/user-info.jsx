// ESTE ESTABA EN UNA CARPETA AUTH EN COMPONENTS

import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { changeUserInfo, getUserAct } from '../../Redux/Actions/UsersActions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const Profile = () => {
  const { usuarios } = useSelector((state) => state)

  useEffect(() => {
    const data = async () => {
      try {
        await dispatch(getUserAct(usuarios.email))
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [usuarios.length])

  // const roles = process.env.REACT_APP_AUTH0_ROLE_ID;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState([])
  const dispatch = useDispatch()
  const history = useHistory()
  const [input, setInput] = useState({
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
    console.log(input);
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.name ||  input.adress.length < 1 || !input.country   || !input.city || !input.zipCode || !input.phone) {
        return alert('Incompletes fields.')
    }
    dispatch(changeUserInfo( usuarios.email, input))
    //  dispatch(getUserAct(usuarios.email))
    setInput({
        name: '',
        zipCode: '',
        adress: "",
        city: "",
        country: "",
        phone: "",
    })

    console.log(user)
    alert('Informacion actualizada con exito!')
    history.push('/profile')
}

  const back = () => {
    history.push('/complete')
  }


  useEffect(() => {
    const generarToken = async () => {
      try {
        if (isAuthenticated === true) {
          user.roles = user ? 'admin' : null
          await dispatch(getUserAct(user.email))
        } else {
          console.log("no")
        }
        const tokenApi = await getAccessTokenSilently()
        setToken(tokenApi)
      } catch (error) {
        console.log(error)
      }

    }
    generarToken()
  }, [user])


  useEffect(() => {
    const data = async () => {
      try {
        await dispatch(getUserAct(user.email))
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [usuarios.length])

    console.log("esto es el usuario", usuarios);
  return (
    isAuthenticated ? <div>
      <form onSubmit={e => handleSubmit(e)}>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        <img src={user.picture} alt={user.name} />
        <br />
        <div>
          
          <label>Email:</label>
          <label>{usuarios.email}:</label>
          <br/>
          <input value = {usuarios.email}
            type = "text"
            name = "email"
            disabled = "disabled"/>
        </div>
        <div>
          <label>Name:</label>
          <label>{usuarios.name}</label>
          <br/>
          <input value={input.name}
            type="text"
            name="name"
            placeholder='Change your name...'
            onChange={handleChange} />
        </div>
        <div>
          <label>Country:</label>
          <label>{usuarios.country}</label>
          <br/>
          <input value={input.country}
            type="text"
            name="country"
            placeholder='Change your country...'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <label>{usuarios.city}</label>
          <br/>
          <input value={input.city}
            type="text"
            name="city"
            placeholder='Change your city...'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <label>{usuarios.zipCode}</label>
          <br/>
          <input value={input.zipCode}
            type="number"
            name="zipCode"
            placeholder='Change your zip code...'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <label>{usuarios.phone}</label>
          <br/>
          <input value={input.phone}
            type="number"
            name="phone"
            placeholder='Change your phone...'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Adress:</label>
          <label>{usuarios.adress}</label>
          <br/>
          <input
            value={input.adress}
            type="text"
            name="adress"
            placeholder='Change your adress...'
            onChange={handleChange}
          />
        </div>
        <br />
        <br />
        {/* <JSONPretty data={usuarios} /> */}

        <button onClick={back}>Volver</button>
        <button className='submit1' type="submit">Save</button>
        <br />
        <label>Info</label>
        <JSONPretty data={user} />
        <label>Token</label>
        <JSONPretty data={token} />
      </form>
    </div>
      : <h1>Necesitas estar autenticado para ingresar aqui</h1>
  )
}

export default Profile;