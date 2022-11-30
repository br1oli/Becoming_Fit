import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCategory, getCategories, deleteCategory } from "../../../Redux/Actions/UsersActions"

const TypeComponent = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: ""
    })
    useEffect(() => {
        dispatch(getCategories())
    },[])

    const allCategories = useSelector((state) => state.categories)

    const handleChange = (e) => {
        e.preventDefault(e);
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault(e);
        dispatch(postCategory(input.name))
        setInput({name: ""})
    }

    const handleDeleteCategories = (e) => {
        e.preventDefault(e);
        dispatch(deleteCategory(e.target.value));
        window.location.reload()

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>New type</legend>
                    <label>
                        Type name:  
                        <input onChange={handleChange} value={input?.name} type="text" name="name"/>
                        <input type="submit" />
                    </label>
                </fieldset>
            </form>

            <div>
                {
                    allCategories.length ?

                    allCategories.map((category, index) => {
                        return (
                            <div key={index}>
                                <button onClick={handleDeleteCategories} value={category?.id}>x</button>
                                <p>{category?.name}</p>
                            </div>
                        )
                    } ) 

                    : (<p>There is not types added yet</p>)
                }
            </div>
        </div>
    )
};

export default TypeComponent;