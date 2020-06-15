import React from 'react';
import styled from 'styled-components';

import { Title, SubTitle } from 'components/common/typography';
import I18n from 'components/common/i18n';

import useShoppingCart from 'hooks/useShoppingCart';

import { ShoppingCart as ShoppingCartType } from 'model';

import ShoppingCartState from './ShoppingCartState';

interface Props extends React.Props<never> {
  id: string;
}

const ProductsList = styled.ul``;
const ProductsListItem = styled.li``;

export default function ShoppingCart({
  id,
}: Props) {
  const { data, loading, error } = useShoppingCart(id);
  const {
    branch,
    customer,
    products,
    state,
  } = data?.shoppingCart ?? {} as ShoppingCartType;

  return (
    <>
      <Title>
        <I18n id="shoppingCart.label" />
      </Title>
      {loading && 'loading'}
      {error && 'error'}
      <SubTitle>
        {state && <ShoppingCartState state={state} />}
      </SubTitle>
      <SubTitle>
        {branch && (
          <>
            <I18n id="shoppingCart.branch.label" />
            {': '}
            {branch.cname}
          </>
        )}
      </SubTitle>
      <SubTitle>
        <I18n id="shoppingCart.customer.label" />
      </SubTitle>
      {customer && (
        <>
          <I18n id="shoppingCart.customer.fullName.label" />
          {': '}
          {customer.fullName ?? <I18n id="shoppingCart.customer.unidentified.label" />}
        </>
      )}
      <SubTitle>
        <I18n id="shoppingCart.products.label" />
      </SubTitle>
      <ProductsList>
        {products?.map(({ count, sku: { id: skuId, shortName } }) => (
          <ProductsListItem key={skuId}>
            {shortName}
            {': '}
            {count}
          </ProductsListItem>
        ))}
      </ProductsList>
    </>
  );
}
