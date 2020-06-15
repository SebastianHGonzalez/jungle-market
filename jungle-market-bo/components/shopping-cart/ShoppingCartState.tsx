import React from 'react';
import styled from 'styled-components';

import I18n from 'components/common/i18n';

import { ShoppingCartState as ShoppingCartStateType } from 'model';

interface Props extends React.Props<never> {
  state: ShoppingCartStateType;
}

const Span = styled.span`
  font-weight: 600;

  &[data-state="OPEN"] {
    color: #080
  }
  &[data-state="CLOSED"] {
    color: #c00
  }
`;

export default function ShoppingCartState({
  state,
}: Props) {
  return (
    <Span data-state={state}>
      <I18n
        id={`shoppingCart.state.${state}.label`}
        fallback={state}
      />
    </Span>
  );
}
