import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  useTheme,
} from "@mui/material";

const StyledSortSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.secondary.main,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.pink.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.pink.main,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.pink.main,
  },
}));

const Sort = ({ searchParams, setSearchParams }) => {
  const theme = useTheme();

  return (
    <Paper component={FormControl} sx={{ minWidth: "90px", width: "110px" }}>
      <InputLabel
        id="sortingOptions"
        sx={{
          "&.Mui-focused": {
            color: theme.palette.pink.main,
          },
        }}
      >
        Select...
      </InputLabel>
      <StyledSortSelect
        variant="outlined"
        labelId="sortingOptions"
        id="sortingOptions"
        label="Select..."
        value={searchParams.get("sort") || ""}
        onChange={(e) =>
          setSearchParams(
            (prev) => {
              prev.set("sort", e.target.value);
              return prev;
            },
            { replace: true }
          )
        }
      >
        <MenuItem value="new">Newest</MenuItem>
        <MenuItem value="old">Oldest</MenuItem>
      </StyledSortSelect>
    </Paper>
  );
};
export default Sort;
