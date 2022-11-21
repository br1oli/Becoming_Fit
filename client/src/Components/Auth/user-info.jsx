// ESTE ESTABA EN UNA CARPETA AUTH EN COMPONENTS

import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css'
import { useState } from 'react'
import { useEffect } from 'react'


const Profile = ()=>{
    const roles = process.env.REACT_APP_AUTH0_ROLE_ID;
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
  const [token, setToken] = useState([])

  useEffect(()=>{
    const generarToken = async ()=>{
        console.log('ESTO ES EL USUARIO ' + user)
        try {
        if(isAuthenticated){
          user.roles = 'admin'
          console.log("admin")
        }else{
          user.roles = null
        }
        const tokenApi = await getAccessTokenSilently()
        setToken(tokenApi)
      } catch (error) {
        console.log(error)
      }
   
  }
  generarToken()
  })
  
  return(
   isAuthenticated && user.roles? <div>
       <img src={user.picture} alt={user.name}/>
       <h2> {user.name} </h2>
       <p>{user.email}</p>
       <JSONPretty data={token}/> 
       <JSONPretty data={user}/>
       
  </div>: <h1>Necesitas ser admin para esto</h1>
    )
}

export default Profile;