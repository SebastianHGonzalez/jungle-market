import { css } from "styled-components";
import { minSm } from "lib/media";

export default css`
  padding-inline-end: 1rem;
  padding-inline-start: 1rem;
  ${minSm`
    padding-inline-end: 2rem;
    padding-inline-start: 2rem;
  `}
`;
