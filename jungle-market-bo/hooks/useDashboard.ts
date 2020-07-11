import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const DASHBOARD_QUERY = gql`
  query dashboard($from: Date) {
    lastDaySales: shoppingCarts(from: $from, state: "CLOSED") {
      count
      shoppingCarts {
        products {
          count
        }
      }
    }
    customersCurrentlyOnStores: shoppingCarts(from: $from, state: "OPEN") {
      count
    }
  }
`;

type DashboardQueryResponse = {
  lastDaySales: { count: number; shoppingCarts: { products: { count: number }[] }[] };
  customersCurrentlyOnStores: { count: number };
}

function getItemsCount({ products }) {
  return products.reduce((acc, { count }) => acc + count, 0);
}

function getItemsSoldCount(shoppingCarts: DashboardQueryResponse['lastDaySales']['shoppingCarts']) {
  return shoppingCarts.reduce((acc, sc) => acc + getItemsCount(sc), 0);
}

export default function useDashboard() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  const { data } = useQuery<DashboardQueryResponse>(DASHBOARD_QUERY, { variables: { from: today }, pollInterval: 5000 });

  const lastDayItemsSold = useMemo(() => data?.lastDaySales && getItemsSoldCount(data.lastDaySales.shoppingCarts), [data?.lastDaySales]);
  const lastDaySales = data?.lastDaySales.count;
  const customersCurrentlyOnStores = data?.customersCurrentlyOnStores.count;

  return {
    lastDayItemsSold,
    lastDaySales,
    customersCurrentlyOnStores,
  };
}
