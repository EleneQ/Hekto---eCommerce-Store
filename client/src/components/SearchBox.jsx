import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { SearchInput, SearchForm, SearchButton } from "./styles/Navbar.styled";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlkeyword } = useParams();
  const [keyword, setKeyword] = useState(urlkeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
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
