import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Main } from 'components/common/layout';
import I18n from 'components/common/i18n';
import Button from 'components/common/input/Button';
import CustomerDashboard from 'components/emulator-dashboard/CustomerDashboard';

import useBranch from 'hooks/useBranch';

import { separatorColor } from 'themes/selectors';

const Section = styled.section``;

const CustomerList = styled.ul`
  margin: -1.5em;
`;
const CustomerListItem = styled.li`
  margin: 1.5em;
  padding-bottom: .75em;
  border-bottom: 1px solid ${separatorColor};
`;

type Props = React.Props<any>;

export default function EmulatorDashboard(props: Props) {
  // TODO: parametrize this argument
  const branchId = 'branch1';

  const {
    customers,
    shoppingCarts,

    onCustomerEnters,
    onCustomerIdentified,
    onCustomerPickedProduct,
    onCustomerLeaves,
  } = useBranch(branchId);

  return (
    <Main>
      <Section>
        <Button onClick={onCustomerEnters}>
          <I18n id="branch.customer.enters" />
        </Button>
      </Section>

      <Section>
        <CustomerList>
          {Object.values(customers).map(({ nonce, id }) => (
            <CustomerListItem key={nonce}>
              <CustomerDashboard
                id={id}
                nonce={nonce}
                products={shoppingCarts[nonce]}

                onIdentify={onCustomerIdentified}
                onProductPicked={onCustomerPickedProduct}
                onLeave={onCustomerLeaves}
              />
            </CustomerListItem>
          ))}
        </CustomerList>
      </Section>
    </Main>
  );
}
