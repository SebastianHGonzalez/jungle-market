import React from 'react';
import styled from 'styled-components';

import Brand from 'components/common/icons/Brand';

import useSession from 'hooks/useSession';

import { desktop } from 'lib/media';

import { separatorColor } from 'themes/selectors';

import Padding from './Padding';

const StyledBrand = styled(Brand)`
  display: none;
  ${desktop`display: unset`}
`;

const Separator = styled.div`
  background-color: ${({ theme }) => theme.table.separator};
  height: 2rem;
  margin: 0 2rem;
  width: 1px;

  display: none;
  ${desktop`display: unset;`}
`;
const Title = styled.h1`
  flex-grow: 1;
  font-size: 1.25rem;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.18px;
  line-height: normal;
`;

interface Props {
  className?: string;
  children?: any;
}

function Head({ className, children }: Props) {
  return (
    <header className={className}>
      <StyledBrand />
      <Separator />
      <Title>{children}</Title>
      <Login />
    </header>
  );
}

export default styled(Head)`
  align-items: center;
  border-block-end: 1px solid ${separatorColor};

  display: flex;
  grid-area: head;
  justify-content: space-between;

  ${Padding}
`;

const Login = styled(({ className }) => {
  const session = useSession();

  return <div className={className}>{session?.name}</div>;
})`
  display: none;
  ${desktop`display: unset;`}
`;
