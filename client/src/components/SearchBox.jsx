import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SearchInput, SearchForm, SearchButton } from "./styles/Navbar.styled";

const SearchBox = ({ setSearchParams }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      setSearchParams((prev) => {
        prev.set("q", keyword);
        return prev;
      });
    }
  };

  return (
    <SearchForm onSubmit={submitHandler}>
      <SearchInput
        name="query"
        type="text"
        value={keyword}
        placeholder="Enter search term"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <SearchButton type="submit">
        <CiSearch />
      </SearchButton>
    </SearchForm>
  );
};
export default SearchBox;
