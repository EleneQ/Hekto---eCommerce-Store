import { List, ListItem } from "@mui/material";

const Paginate = ({
  pages,
  setSearchParams,
  setPageNum,
  currentPageNum,
  listItemStyles = {},
}) => {
  const {
    borderRadius = "10px",
    width = "25px",
    height = "5px",
    indicatorColor = "skyblue",
    bgColor = "transparent",
    border = "none",
  } = listItemStyles;

  const handleClick = (page) => {
    if (setPageNum) {
      setPageNum(page);
    } else {
      setSearchParams((prev) => {
        prev.set("p", page);
        return prev;
      });
    }
  };

  return (
    pages > 1 && (
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1rem",
          gap: "0.3rem",
        }}
      >
        {[...Array(pages).keys()].map((page) => (
          <ListItem
            key={page + 1}
            sx={{
              borderRadius: borderRadius,
              border: border,
              width: width,
              height: height,
              padding: 0,
              backgroundColor:
                currentPageNum === page + 1 ? indicatorColor : bgColor,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => handleClick(page + 1)}
          />
        ))}
      </List>
    )
  );
};

export default Paginate;
