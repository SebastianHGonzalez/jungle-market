import styled from "styled-components";

import Main from "./Main";
import { minSm } from "lib/media";

export default styled(Main)`
  grid-gap: 1rem;
  grid-template-areas: "filter" "results" "pagination";
  grid-template-rows: min-content min-content 1fr min-content;

  padding-block-start: 1rem;
`;

export const FilterContainer = styled.section`
  display: grid;
  grid-area: filter;
  grid-gap: 1rem;

  ${minSm`
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  `}
`;

export const ResultsContainer = styled.section`
  display: grid;
  grid-area: results;
  grid-gap: 1rem;
`;

export const PaginationContainer = styled.section`
  align-items: center;
  display: flex;
  grid-area: pagination;
  justify-content: center;
  margin: 0.5rem;

  & > * {
    margin: 0 0.5rem;
  }
`;
