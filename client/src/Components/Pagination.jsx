import { useDispatch, useSelector } from 'react-redux';
import { setProductsPerPage } from '../Redux/Actions/Actions';

export const Pagination = () => {
  const { products, productsPerPage } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const pagination = (numPage) => {
    dispatch(setProductsPerPage(numPage));
  };

  let pagesNumbers = [];
  for (
    let index = 1;
    index <= Math.ceil(products.length / productsPerPage);
    index++
  ) {
    pagesNumbers = [...pagesNumbers, index];
  }

  const handlePagination = (number) => {
    pagination(number);
  };

  return (
    <div>
      {pagesNumbers.map((number) => (
        <button key={number} onClick={() => handlePagination(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};
