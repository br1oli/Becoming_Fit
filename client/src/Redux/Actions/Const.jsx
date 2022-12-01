//Products
export const URL_PRODUCTS = "/products";
export const URL_PRODUCTS_QUERY = "/products?name=";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_NAME_PRODUCTS = "GET_NAME_PRODUCTS";
export const GET_NAME_PRODUCTS_ERROR = "GET_NAME_PRODUCTS_ERROR"
export const POST_PRODUCT = "POST_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT PRODUCT";
export const CHANGE_PRODUCT_STOCK = "CHANGE_PRODUCT_STOCK";

//Filters & Sorts
export const FILTER_PRICES = "FILTER_PRICES";
export const FILTER_CATEGORIES = "FILTER_CATEGORIES";
export const FILTER_GENDER = "FILTER_GENDER";
export const FILTER_SIZE = "FILTER_SIZE";
export const FILTER_BRAND = "FILTER_BRAND";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_PRICE = "ORDER_BY_PRICES";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";

//Handlers
export const CLEAR_RESPONSE = "CLEAR_RESPONSE";

// const from pagination:
export const SET_CURRENT_PAGE_PRODUCTS = "get/current/page/products";

// Shopping cart actions

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const POST_TO_CART_DB = "POST_TO_CART_DB";
export const GET_CART_DB = "GET_CART_DB";
export const DELETE_CART = "DELETE_CART";
export const DELETE_PRODUCT_CART = "DELETE_PRODUCT_CART";
export const ERROR_CART = "ERROR_CART";
export const PAYMENT_ORDER = "PAYMENT_ORDER";
export const ERROR_PAYMENT = "ERROR_PAYMENT";

//User actions
export const SET_TOKEN = "SET_TOKEN";
export const CREATE_USER = "CREATE_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

//User profile actions
export const URL_USER_PROFILE = "/userProfile";
export const URL_USER_PROFILES = "/userProfiles";
export const GET_ALL_USER_PROFILES = "GET_ALL_USER_PROFILES";
export const GET_USER_PROFILE_BY_EMAIL = "GET_USER_PROFILE_BY_EMAIL";
export const CREATE_USER_PROFILE = "CREATE_USER_PROFILE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const DELETE_USER_PROFILE = "DELETE_USER_PROFILE";

// Favorites consts
export const ADD_PRODUCT_TO_FAVORITES = "ADD_PRODUCT_TO_FAVORITES";
export const GET_PRODUCT_FROM_FAVORITES = "GET_PRODUCT_FROM_FAVORITES";
export const REMOVE_ALL_FROM_FAVORITES = "REMOVE_ALL_FROM_FAVORITES";
export const REMOVE_ONE_FROM_FAVORITES = "REMOVE_ONE_FROM_FAVORITES";

//Reviews consts
export const ADD_REVIEW_TO_PRODUCT = "ADD_REVIEW_TO_PRODUCT";
export const GET_REVIEWS = "GET_REVIEWS";
export const EDIT_REVIEW = "EDIT_REVIEW";
export const REMOVE_ONE_REVIEW = "REMOVE_ONE_REVIEW";

//Mailing
export const POST_MAIL = "POST_MAIL";
export const POST_MAIL_DELIVER = "POST_MAIL_DELIVER";

//New type product
export const POST_NEW_PRODUCT_CATEGORY = "POST_NEW_PRODUCT_CATEGORY";
export const GET_PRODUCT_CATEGORIES = "GET_PRODUCT_CATEGORIES";
export const DELETE_PRODUCT_CATEGORY = "DELETE_PRODUCT_CATEGORY";

//Orders
export const CREATE_USER_ORDER = "CREATE_USER_ORDER";
export const GET_USER_ORDER = "GET_USER_ORDER";
export const GET_ALL_ORDERS_ADMIN = "GET_ALL_ORDERS_ADMIN"
