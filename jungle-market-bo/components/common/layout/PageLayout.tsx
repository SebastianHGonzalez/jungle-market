import styled from 'styled-components';

const PageLayout = styled.div`
  display: grid;

  grid-template-areas: "head" "main";
  grid-template-rows: 4rem 1fr;

  height: 100%;
  overflow: hidden;
`;

export default PageLayout;
