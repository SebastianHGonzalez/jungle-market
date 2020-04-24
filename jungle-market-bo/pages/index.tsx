import React from 'react';

import I18n from 'components/common/i18n';
import { PageLayout, Head } from 'components/common/layout';
import ShoppingCartList from 'components/shopping-cart-list';

import { QueryStateProvider, deserializeQuery } from 'hooks/useQueryState';

interface Props {
  branchId: string;
  initialState: {};
}

export default function BranchDashboardPage({ initialState }: Props) {
  return (
    <PageLayout>
      <Head>
        <I18n id="app.name" />
      </Head>
      <QueryStateProvider initialState={initialState}>
        <ShoppingCartList />
      </QueryStateProvider>
    </PageLayout>
  );
}

BranchDashboardPage.getInitialProps = ({ query }) => ({
  initialState: deserializeQuery(query),
});
