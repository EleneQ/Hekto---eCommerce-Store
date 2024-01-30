const Paginate = ({ pages, currentPageNum, setSearchParams, setPageNum }) => {
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
            onClick={
              setPageNum
                ? () => {
                    setPageNum(page + 1);
                  }
                : () =>
                    setSearchParams((prev) => {
                      prev.set("p", page + 1);
                      return prev;
                    })
            }
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
