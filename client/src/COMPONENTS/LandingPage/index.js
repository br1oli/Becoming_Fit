import React from "react";
// import Style from './LandingPage.css'
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return(
        <div className="Container">
            <div className="SubContainer">
                <h1>Bienvenidos a mi página</h1>
                <Link to = '/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
            <div className="NombrePI">
                <h1>Henry Videogames</h1>

            </div>
        </div>
    )
}