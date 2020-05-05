import { css } from "styled-components";
import { minSm } from "lib/media";

export default css`
  padding: 0.5rem 1rem;
  ${minSm`
    padding: 1rem 2rem;
  `}
`;
