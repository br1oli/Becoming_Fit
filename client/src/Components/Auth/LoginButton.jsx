import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { Button } from 'react-bootstrap';

const LoginButton = ()=>{
    const {loginWithRedirect} = useAuth0();

    return(
        <Button
        className='btn btn-primary btn-block'
        onClick={()=> loginWithRedirect({appState:{returnTo: '/home'}})}>
            Log in
        </Button>
    )
}

export default LoginButton;