import styled from 'styled-components';

import Padding from './Padding';

const Main = styled.main`
  display: grid;
  grid-area: main;
  ${Padding}

  grid-auto-rows: min-content;
  grid-gap: 1rem;
`;

export default Main;
