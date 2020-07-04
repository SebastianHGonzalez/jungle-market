import React from 'react';
import styled from 'styled-components';

import ShoppingCartIcon from 'components/common/icons/ShoppingCart';
import ShoppingBagIcon from 'components/common/icons/ShoppingBag';
import ShopIcon from 'components/common/icons/Shop';
import I18n from 'components/common/i18n';

import useDashboard from 'hooks/useDashboard';

const AggregationList = styled.ul`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const Aggregation = styled.li`
  border: 1px solid #dadada;
  display: grid;
  grid-template-columns: 5em 1fr;
  grid-gap: 1em;
  align-items: center;
`;

const AggregationIconWrapper = styled.div`
  padding: 1em;
  color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AggregationDescription = styled.div``;

const AggretaionNumber = styled.span`
  font-size: 18px;
`;

export default function Dashboard() {
  const {
    lastDayItemsSold,
    lastDaySales,
    customersCurrentlyOnStores,
  } = useDashboard();

  return (
    <AggregationList>

      <Aggregation>
        <AggregationIconWrapper style={{ backgroundColor: '#0000aa' }}>
          <ShoppingBagIcon />
        </AggregationIconWrapper>
        <AggregationDescription>
          <I18n id="dashboard.aggregations.lastDayItemsSold.label" />
          {': '}
          <br />
          <AggretaionNumber>{lastDayItemsSold}</AggretaionNumber>
        </AggregationDescription>
      </Aggregation>

      <Aggregation>
        <AggregationIconWrapper style={{ backgroundColor: '#aa0000' }}>
          <ShoppingCartIcon />
        </AggregationIconWrapper>
        <AggregationDescription>
          <I18n id="dashboard.aggregations.lastDaySales.label" />
          {': '}
          <br />
          <AggretaionNumber>{lastDaySales}</AggretaionNumber>
        </AggregationDescription>
      </Aggregation>

      <Aggregation>
        <AggregationIconWrapper style={{ backgroundColor: '#00aa00' }}>
          <ShopIcon />
        </AggregationIconWrapper>
        <AggregationDescription>
          <I18n id="dashboard.aggregations.customersCurrentlyOnStores.label" />
          {': '}
          <br />
          <AggretaionNumber>{customersCurrentlyOnStores}</AggretaionNumber>
        </AggregationDescription>
      </Aggregation>

    </AggregationList>
  );
}
