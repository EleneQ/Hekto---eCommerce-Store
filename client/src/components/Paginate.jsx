import { List, ListItem, useTheme } from "@mui/material";

const Paginate = ({ pages, currentPageNum, setSearchParams, setPageNum }) => {
  const theme = useTheme();

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
              borderRadius: "10px",
              backgroundColor:
                page + 1 === currentPageNum
                  ? theme.palette.pink.main
                  : theme.palette.pink.medium,
              width: "25px",
              height: "5px",
              padding: 0,
              "&:hover": {
                cursor: "pointer",
              },
            }}
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
          />
        ))}
      </List>
    )
  );
};

export default Paginate;
