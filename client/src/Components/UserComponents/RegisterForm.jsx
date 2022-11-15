import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function RegisterForm() {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
    	userName: "",
    	firstName: "",
    	lastName: "",
        email: "",
        password: "",
        zipCode: "",
        telephone: "", 
        image: "",
        address: ""
        });
    
    function validate(input) {
    	let errors = {};
    	if (!input.userName) {
    		errors.userName = "Enter a username ";
    	} else if (!input.firstName) {
    		errors.firstName = "Enter a first name";
    	}
    	else if (!input.lastName) {
    		errors.lastName = "Enter a last name";
    	} 
    	else if (!input.email) {
    		errors.email = "Enter a email";
    	}
        else if (!input.address) {
    		errors.address = "Enter a adress";   
    	}
        else if (!input.password) {
    		errors.password = "Enter a password";   
    	}
        else if (!input.zipCode) {
    		errors.zipCode = "Enter a zip code";   
    	}
        else if (!input.telephone) {
    		errors.telephone = "Enter a phone number";   
    	}
        else if (!input.image) {
    		errors.image = "Enter a URL image";   
    	}        
    	return errors;
    }

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

    const handleSubmit = (e) => {
    	e.preventDefault()
    	if (!input.userName || !input.firstName || !input.lastName || !input.email || !input.password || !input.zipCode || !input.telephone || !input.image || !input.address) {
    		return alert('Incomplete fields.')
    	}
    	setInput({
            userName: "",
            firstName: "", 
            lastName: "",
            email: "",
            password: "",
            zipCode: "",
            telephone: "", 
            image: "",
            address: "",
    	})
    	alert('Product created!')
    	history.push('/home')
    }

    return (
        <div>
            <div>
                <Link to="/home">
                    <button> Back </button>
                </Link>
            </div>
            <div>
                <h1> Sign In </h1>
            </div>
            <div>
                <form 
                onSubmit={e => handleSubmit(e)}
                >
                    <div>
                        <label>Username</label>

                        <input
                            placeholder="Write here"
                            type="text"
                            value={input.userName}
                            name="userName"
                            autoComplete="off"
                            onChange={e => handleChange(e)}
                        />
                        {errors.userName && <p className="error">{errors.userName}</p>}
                        </div>

                    <div>
                        <label>First Name</label>
                            <input
                                placeholder="Write here"
                                type="text"
                                value={input.firstName}
                                name="firstName"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>                    

                    <div>
                        <label>Last Name</label>
                            <input
                                placeholder="Write here"
                                type="text"
                                value={input.lastName}
                                name="lastName"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>

                    <div>
                        <label>Email</label>
                            <input
                                placeholder="Write here"
                                type="text"
                                value={input.email}
                                name="email"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div>
                        <label>Adress</label>
                            <input
                                placeholder="Write here"
                                type="address"
                                value={input.address}
                                name="address"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                            {errors.address && <p className="error">{errors.address}</p>}
                    </div>

                    <div>
                        <label>Password</label>
                            <input
                                placeholder="Write here"
                                type="password"
                                value={input.password}
                                name="password"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <div>
                        <label>Zip Code</label>
                            <input
                                placeholder="Write here"
                                type="text"
                                value={input.zipCode}
                                name="zipCode"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                            {errors.zipCode && <p className="error">{errors.zipCode}</p>}
                    </div>

                    <div>
                        <label>Telephone</label>
                            <input
                                placeholder="Write here"
                                type="number"
                                value={input.telephone}
                                name="telephone"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                            {errors.telephone && <p className="error">{errors.telephone}</p>}
                    </div>

                    <div>
                        <label>Image</label>
                            <input
                                placeholder="Write here"
                                type="text"
                                value={input.image}
                                name="image"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                            />
                            {errors.image && <p className="error">{errors.image}</p>}
                    </div>
                    <button type="submit">Create User!</button>
                </form>
            </div>
        </div>
    );
}

