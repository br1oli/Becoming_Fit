// ESTE ESTABA EN UNA CARPETA AUTH EN COMPONENTS

import react from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { Button } from 'react-bootstrap';

const LogoutButton = ()=>{
  const {logout} = useAuth0();
  return(
    <Button className='btn btn-danger btn-block'
    onClick={()=> logout({
      returnTo:window.location.origin
    })}>
    Log Out
    </Button>
  )
}

export default LogoutButton;