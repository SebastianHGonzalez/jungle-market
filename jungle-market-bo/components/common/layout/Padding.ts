import { css } from "styled-components";
import { minSm } from "lib/media";

export default css`
  padding: 1rem;
  ${minSm`
    padding: 2rem;
  `}
`;
