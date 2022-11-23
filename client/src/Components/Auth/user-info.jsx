// ESTE ESTABA EN UNA CARPETA AUTH EN COMPONENTS

import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserAct } from '../../Redux/Actions/UsersActions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const Profile = () => {
  // const roles = process.env.REACT_APP_AUTH0_ROLE_ID;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState([])
  const dispatch = useDispatch()
  const {usuarios} = useSelector((state) => state)
  const history = useHistory()
  

  const back = () =>{
    history.push('/complete')
  }
  useEffect(()=>{
  },[user])

  useEffect(() => {
    const generarToken = async () => {
      try {
        if (isAuthenticated === true) {
          user.roles = user? 'admin': null
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
  },[user])

  // useEffect(()=>{
  //   const actInfo = async ()=>{
  //     try {
  //       user.name = usuarios.name
  //       user.email = usuarios.email
  //       user.address = usuarios.address
  //       user.country = usuarios.country
  //       user.city = usuarios.city
  //       user.zipCode = usuarios.zipCode
  //       user.phone = usuarios.phone
  //       console.log("user", user)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   actInfo()
  // },[user])

  // if(usuarios){
  //   try {
  //           user.name = usuarios.name
  //           user.email = usuarios.email
  //           user.address = usuarios.address
  //           user.country = usuarios.country
  //           user.city = usuarios.city
  //           user.zipCode = usuarios.zipCode
  //           user.phone = usuarios.phone
  //           console.log("user", user)
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       }
  


console.log("adress", usuarios.adress)
  return (
    
    isAuthenticated ? <div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <img src={user.picture} alt={user.name} />
      <br/>
      <label>Name:</label>
      <h2> {user.name} </h2>
      <label>Email:</label>
      <p>{user.email}</p>


      <label>Country:</label>
      {usuarios.country}
      <br/>
      <label>City:</label>
      {usuarios.city}
      <br/>
      <label>Zip Code:</label>
      {usuarios.zipCode}
      <br/>
      <label>Phone:</label>
      {usuarios.phone}
      <br/>
      <br/>
      <label>Info</label>
      <JSONPretty data={user} />
      <label>Token</label>
      <JSONPretty data={token} />


      <h4>{usuarios.adress}</h4>
      {usuarios.adress?.map(p => {
								return (
									<option
										value={p}
										name='adress'
										key={usuarios.adress.indexOf(p)}
									>{p}</option>

								)
							})}
      {/* <JSONPretty data={usuarios} /> */}

      <button onClick={back}>Volver</button>
    </div> : <h1>Necesitas estar autenticado para ingresar aqui</h1>
  )
}

export default Profile;