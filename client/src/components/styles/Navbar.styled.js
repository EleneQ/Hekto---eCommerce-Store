import styled from "styled-components";

export const NavbarStyled = styled.header`
  padding-block: 1rem;

  .container {
    display: flex;
    gap: 3rem;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Nav = styled.nav`
  display: none;

 
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;


`;

export const Logo = styled.p`

`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input`
  height: 100%;

  padding-inline: 0.8rem;
  padding-block: 0.35rem;
`;

export const SearchButton = styled.button`

  color: white;
  height: 100%;
  padding-inline: 0.6rem;
  padding-block: 0.1rem;
  font-size: 1.3rem;
`;

export const LoginButton = styled.button`

  color: white;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;
