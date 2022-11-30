import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameProducts } from "../../../Redux/Actions/UsersActions";
import { AiOutlineSearch } from "react-icons/ai";

import Styles from "./SearchBar.module.css";

const SearchInput = (props) => {
  const [input, setInput] = useState("");
  let dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault(e);
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    dispatch(getNameProducts(input));
    setInput("");
  };

  return (
    <div className={Styles.searchBar}>
      <div className={Styles.formSearch}>
        <input
          type={"text"}
          name="products"
          value={input}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          className={Styles.inputSearch}
        />

        <div className={Styles.btnIcon}>
          <i className={Styles.searchIcon} onClick={(e) => handleSubmit(e)}>
            <AiOutlineSearch className={Styles.tareaIcono} />
          </i>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
