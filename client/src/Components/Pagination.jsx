import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setProductsPerPage } from "../Redux/Actions/UsersActions";

export const Pagination = () => {
  const { products, productsPerPage, currentPage, currentProducts } =
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
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a
            className={classnames("page-link", {
              disabled: currentPage === 1,
            })}
            onClick={() => handlePagination(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {pagesNumbers.map((number) => (
          <li className="page-item" key={number}>
            <a
              className="page-link"
              key={number}
              href="#"
              onClick={() => handlePagination(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className={classnames("page-link", {
              disabled: currentProducts?.length < 6,
            })}
            href="#"
            onClick={() => handlePagination(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
