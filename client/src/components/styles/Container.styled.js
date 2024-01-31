import styled from "styled-components";

const Container = styled.div`
  padding-inline: 2rem;
  margin-inline: auto;
  max-width: 80rem;

  @media (min-width: 45rem) {
    padding-inline: 4rem;
  }

  @media (min-width: 54rem) {
    padding-inline: 7rem;
  }
`;

export default Container;
