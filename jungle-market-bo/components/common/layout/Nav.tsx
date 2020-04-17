import styled from "styled-components";

import Padding from "./Padding";

import { separatorColor } from "themes/selectors";

const Nav = styled.nav`
  border-block-end: 1px solid ${separatorColor};

  display: flex;

  grid-area: nav;
  ${Padding}
`;

export default Nav;
