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

type Props = React.Props<any>;

export default function ShoppingCartList({}: Props) {
  const { data, loading, error } = useShoppingCarts();
  const { shoppingCarts = [] } = data || {};

  return (
    <div>
      {loading && 'loading'}
      {error && 'error'}

      <Table>
        <TableHead>
          <TableRow>
            <TableH>
              <I18n id="shoppingCarts.customer.label" />
            </TableH>
            <TableH>
              <I18n id="shoppingCats.products.label" />
            </TableH>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoppingCarts
            && shoppingCarts.map
            && shoppingCarts.map(({ customer, products }) => (
              <TableRow>
                <TableData>
                  <Value>{customer}</Value>
                </TableData>
                <TableData>
                  {products
                    && products.map
                    && products.map(({ sku, count }) => (
                      <>
                        <Value>
                          <I18n id="shoppingCart.products.sku.label" />
                          {sku}
                        </Value>
                        <ValueDetail>
                          <I18n id="shoppingCart.products.count.label" />
                          {count}
                        </ValueDetail>
                      </>
                    ))}
                </TableData>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
