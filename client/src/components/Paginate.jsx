const Paginate = ({ pages, currentPageNum, setPageNum }) => {
  return (
    pages > 1 && (
      <ul
        style={{
          display: "flex",
          gap: "0.3rem",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {[...Array(pages).keys()].map((page) => (
          <li
            key={page + 1}
            onClick={() => setPageNum(page + 1)}
            style={{
              color: page + 1 === currentPageNum ? "red" : "black",
              cursor: "pointer",
            }}
          >
            {page + 1}
          </li>
        ))}
      </ul>
    )
  );
};

export default Paginate;
