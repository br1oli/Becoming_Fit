import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getBrands,
  filterByCategory,
  filterByBrands,
  filterByPrice,
  filterByGender,
  filterBySize,
  orderByName,
  orderByPrice,
} from "../Redux/Actions/Actions";

export default function Filters() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const allBrands = useSelector((state) => state.brands);

  return (
    <div className="filters-container">
      <div>
        <select>
          <option value="all">ALL CATEGORIES</option>
          <option value="jackets">JACKETS</option>
          <option value="shoes">SHOES</option>
          <option value="pants">PANTS</option>
          <option value="t-shirts">T-SHIRTS</option>
        </select>
      </div>

      <div>
        <select>
          <option value="all">ALL PRICES</option>
          <option value="<50"> less than 50 </option>
          <option value="50 - 100"> 50 - 100 </option>
          <option value=">100"> more than 100 </option>
        </select>
      </div>

      <div>
        <select>
          <option value="all">ALL GENDERS</option>
          <option value="male">MALE</option>
          <option value="female">FEMALE</option>
        </select>
      </div>

      <div>
        <select>
          <option value="all">ALL SIZEs</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
        </select>
      </div>

      <div>
        <select>
          <option value="all">ORDER BY PRODUCT NAME</option>
          <option value="asc">A - Z</option>
          <option value="des">Z - A</option>
        </select>
      </div>

      <div>
        <select>
          <option value="all">ORDER BY PRICES</option>
          <option value="asc">LOWER PRICE</option>
          <option value="des">HIGHER PRICE</option>
        </select>
      </div>
    </div>
  );
}
