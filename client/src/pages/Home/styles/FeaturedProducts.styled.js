import styled from "styled-components";

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

export const ProductStyled = styled.li`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 15px 0px;
  border-radius: 10px;
  cursor: pointer;
`;

export const ImageContainer = styled.div`

  padding: 2rem;
  border-radius: 10px;

  img {
    border-radius: inherit;
    width: 85%;
    aspect-ratio: 1;
    margin-inline: auto;
  }
`;

export const ProductName = styled.p`

`;

export const ProductColors = styled.ul`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-block: 0.7rem;
`;

export const ProductColor = styled.li`
  border-radius: 5px;
  width: 1.5rem;
  height: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px;
`;
