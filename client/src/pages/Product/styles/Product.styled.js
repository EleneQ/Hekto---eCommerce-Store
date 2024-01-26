import styled from "styled-components";

export const ProductStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const Image = styled.img`
  width: 85%;
  height: 85%;
`;

export const PoductColors = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ColorsList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  li {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 5px;
  }
`;

export const AddToCartButton = styled.button`
  padding: 0.9rem 1rem;
  background-color: ${({ theme }) => theme.colors.pink8};
  color: white;
  border-radius: 10px;
  margin-top: 2rem;

  &.out-of-stock {
    background-color: #cecece;
    cursor: default;
  }
`;
