import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound () {
    return (
        <div>
            <h1>404</h1>
            <Link to = '/home'>
                <button>Back to Home</button>
            </Link>   
        </div>        
    )
}