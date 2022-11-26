import Styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductsPerPage } from "../../Redux/Actions/UsersActions";

export const Pagination = () => {
  const { products, productsPerPage, currentPage /* currentProducts */ } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  const pagination = (numPage) => {
    dispatch(setProductsPerPage(numPage));
  };

  let pagesNumbers = [];

  for (
    let index = 1;
    index <= Math.ceil(products?.length / productsPerPage);
    index++
  ) {
    pagesNumbers = [...pagesNumbers, index];
  }

  const handlePagination = (number) => {
    pagination(number);
  };

  return (
    <nav className={Styles.paginadoContainer}>
      <ul className={Styles.paginado}>
        <a
          href="#"
          className={Styles.numberArrow}
          onClick={() => handlePagination(currentPage - 1)}
        >
          Previous
        </a>

        {pagesNumbers.map((number) => (
          <li className={Styles.numberLi} key={number}>
            <a
              href="#"
              className={`${Styles.number} ${
                number === currentPage ? Styles.current : ""
              }`}
              key={number}
              onClick={() => handlePagination(number)}
            >
              {number}
            </a>
          </li>
        ))}

        <a
          className={Styles.numberArrow}
          href="#"
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next
        </a>
      </ul>
    </nav>
  );
};
