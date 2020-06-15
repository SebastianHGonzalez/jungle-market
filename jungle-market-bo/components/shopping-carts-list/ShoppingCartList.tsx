import React from 'react';
import styled from 'styled-components';

import useShoppingCarts from 'hooks/useShoppingCarts';

import {
  Table,
  TableHead,
  Value,
  TableH,
  TableRow,
  TableBody,
  TableData,
  ValueDetail,
} from 'components/common/layout/Table';
import I18n from 'components/common/i18n';
import Link from 'components/common/Link';
import { Title } from 'components/common/typography';

type Props = React.Props<any>;

const A = styled.a`
  display: contents;
  cursor: pointer;
`;

export default function ShoppingCartList({ }: Props) {
  const { data, loading, error } = useShoppingCarts();
  const shoppingCarts = data?.shoppingCarts?.shoppingCarts ?? [];

  return (
    <>
      <Title>
        <I18n id="shoppingCarts.label" />
      </Title>

      {loading && 'loading'}
      {error && 'error'}

      <Table>
        <TableHead>
          <TableRow>
            <TableH>
              <I18n id="shoppingCart.customer.label" />
            </TableH>
            <TableH>
              <I18n id="shoppingCart.products.label" />
            </TableH>
            <TableH>
              <I18n id="shoppingCart.state.label" />
            </TableH>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoppingCarts.map(({
            id, customer, products, state,
          }) => (
            <TableRow key={id}>
              <TableData>
                <Link href="/shopping-carts/[shoppingCartId]" as={`/shopping-carts/${id}`} component={A}>
                  {
                      customer?.fullName
                        ? <Value>{customer.fullName}</Value>
                        : <ValueDetail><I18n id="shoppingCart.customer.unidentified.label" /></ValueDetail>
                  }
                </Link>
              </TableData>
              <TableData>
                <Link href="/shopping-carts/[shoppingCartId]" as={`/shopping-carts/${id}`} component={A}>
                  <Value>
                    {products.reduce((acc, { count }) => acc + count, 0)}
                  </Value>
                </Link>
              </TableData>
              <TableData>
                <Link href="/shopping-carts/[shoppingCartId]" as={`/shopping-carts/${id}`} component={A}>
                  <Value>
                    <I18n
                      id={`shoppingCart.state.${state}.label`}
                      fallback={state}
                    />
                  </Value>
                </Link>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
