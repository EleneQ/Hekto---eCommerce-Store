import { Link } from "react-router-dom";

const Paginate = ({ pages, currentPage, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <ul>
        {[...Array(pages).keys()].map((page) => (
          <Link
            key={page + 1}
            style={{ color: page + 1 === currentPage ? "red" : "gray" }}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : `/admin/productlist/${page + 1}`
            }
          >
            <li>{page + 1}</li>
          </Link>
        ))}
      </ul>
    )
  );
};
export default Paginate;