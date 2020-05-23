import React from 'react';

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
import { Main } from 'components/common/layout';

type Props = React.Props<any>;

export default function ShoppingCartList({ }: Props) {
  const { data, loading, error } = useShoppingCarts();
  const shoppingCarts = data?.shoppingCarts?.shoppingCarts ?? [];

  return (
    <Main>
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
          {shoppingCarts.map(({ customer, products, state }) => (
            <TableRow>
              <TableData>
                <Value>{customer?.fullName}<small>({customer?.id})</small></Value>
              </TableData>
              <TableData>
                {products.map(({ sku, count }) => (
                  <>
                    <Value>
                      <I18n id="shoppingCart.products.sku.label" />
                      {': '}
                      {sku?.id}
                    </Value>
                    <ValueDetail>
                      <I18n id="shoppingCart.products.count.label" />
                      {': '}
                      {count}
                    </ValueDetail>
                  </>
                ))}
              </TableData>
              <TableData>
                <Value>
                  <I18n
                    id={`shoppingCart.state.${state}.label`}
                    fallback={state}
                  />
                </Value>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Main>
  );
}
