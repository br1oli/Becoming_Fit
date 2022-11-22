import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameProducts } from "../../../Redux/Actions/UsersActions";
import { AiOutlineSearch } from "react-icons/ai";

import Styles from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { StylesContext } from "@material-ui/styles";

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
{
  /* <form onSubmit={(e) => handleSubmit(e)} className={style.formSearch}>
      <input
        className={style.input}
        type={"text"}
        name="products"
        value={input}
        placeholder="Search"
        onChange={(e) => handleChange(e)}
      />
      <button className={style.submit} type={"submit"}>
        <SearchIcon style={{ fontSize: 28 }} />
      </button>
    </form> */
}
