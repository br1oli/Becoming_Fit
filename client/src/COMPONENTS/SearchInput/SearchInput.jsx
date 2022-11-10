import React, { useState } from "react";
import style from "./SearchInput.module.css";

const SearchInput = (props) => {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault(e);
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(e);
        console.log(input)
        setInput("")
    }

    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className={style.input} type={"text"} name="products" value={input} placeholder="Search" onChange={(e)=>handleChange(e)}/>
                <input className={style.submit} type={"submit"}/> 
            </form>
        </div>
    )
}

export default SearchInput;