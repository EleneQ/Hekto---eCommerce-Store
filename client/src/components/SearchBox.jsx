import { Divider, IconButton, Paper, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ setSearchParams }) => {
  const theme = useTheme();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setSearchParams((prev) => {
      prev.set("q", keyword);
      return prev;
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        border: `1px solid ${theme.palette.pink.main}`,
      }}
    >
      <TextField
        variant="standard"
        color={theme.palette.secondary.main}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
        sx={{ ml: 1, flex: 1, border: "none" }}
        placeholder="Enter search term..."
        InputProps={{
          disableUnderline: true,
          style: { color: theme.palette.secondary.main },
        }}
      />

      <Divider
        sx={{ height: 28, m: 0.5, bgcolor: theme.palette.pink.main }}
        orientation="vertical"
      />

      <IconButton
        type="submit"
        sx={{ p: "10px", fontSize: "1rem" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
export default SearchBox;
