import React from "react";
import { useDispatch } from "react-redux";
import {
  orderByPrice,
  getProducts,
  orderByName,
  filterByGender,
  filterBySize,
  filterByBrand,
  filterByCategory,
  filterByPrice,
} from "../../Redux/Actions/UsersActions";
import Style from "./Filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();

  function handleReload(e) {
    e.preventDefault();
    dispatch(getProducts());
  }

  function handleFilterPrice(e) {
    e.preventDefault();
    dispatch(filterByPrice(e.target.value));
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  function handleSortPrice(e) {
    e.preventDefault();
    dispatch(orderByPrice(e.target.value));
  }

  function handleFilterGender(e) {
    e.preventDefault();
    dispatch(filterByGender(e.target.value));
  }

  function handleFilterCategory(e) {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
  }

  function handleFilterBrand(e) {
    e.preventDefault();
    dispatch(filterByBrand(e.target.value));
  }

  function handleFilterSize(e) {
    e.preventDefault();
    dispatch(filterBySize(e.target.value));
  }

  return (
    <div className={Style.filterContainer}>
      <div>
        <select
          className={Style.select}
          onChange={(e) => handleFilterCategory(e)}
        >
          <option value="all">ALL CATEGORIES</option>
          <option value="jacket">JACKETS</option>
          <option value="shoes">SHOES</option>
          <option value="pants">PANTS</option>
          <option value="t-shirt">T-SHIRTS</option>
        </select>
      </div>

      <div>
        <select className={Style.select} onChange={(e) => handleFilterPrice(e)}>
          <option value="all">ALL PRICES</option>
          <option value="<50"> less than 50 </option>
          <option value="50 - 100"> 50 - 100 </option>
          <option value=">100"> more than 100 </option>
        </select>
      </div>

      <div>
        <select
          className={Style.select}
          onChange={(e) => handleFilterGender(e)}
        >
          <option value="all">ALL GENDERS</option>
          <option value="male">MALE</option>
          <option value="female">FEMALE</option>
          <option value="unisex">UNISEX</option>
        </select>
      </div>

      <div>
        <select className={Style.select} onChange={(e) => handleFilterSize(e)}>
          <option value="all">ALL SIZES</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="2XL">2XL</option>
        </select>
      </div>

      <div>
        <select className={Style.select} onChange={(e) => handleFilterBrand(e)}>
          <option value="all">ALL BRANDS</option>
          <option value="adidas">ADIDAS</option>
          <option value="nike">NIKE</option>
          <option value="puma">PUMA</option>
          <option value="reebok">REEBOK</option>
          <option value="topper">TOPPER</option>
        </select>
      </div>

      <div>
        <select className={Style.select} onChange={(e) => handleSortName(e)}>
          <option value="all">ORDER BY NAME</option>
          <option value="asc">A - Z</option>
          <option value="des">Z - A</option>
        </select>
      </div>

      <div>
        <select className={Style.select} onChange={(e) => handleSortPrice(e)}>
          <option value="all">ORDER BY PRICES</option>
          <option value="asc">LOWER PRICE</option>
          <option value="des">HIGHER PRICE</option>
        </select>
      </div>
      <br />
      <div>
        <button className={Style.select} onClick={(e) => handleReload(e)}>
          REFRESH
        </button>
      </div>
    </div>
  );
}
