import styled from "styled-components";

const SectionHeading = styled.h2`
  color: ${({ theme }) => theme.colors.blue22};
  font-size: ${({ theme }) => theme.typography.fs19};
  font-weight: ${({ theme }) => theme.typography.fwBold};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export default SectionHeading;
