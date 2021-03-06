import React from 'react';

import I18n from 'components/common/i18n';
import { PageLayout, Head, Main, Body, Aside } from 'components/common/layout';
import Drawer from 'components/common/drawer';
import ShoppingCartsList from 'components/shopping-carts-list';

import { QueryStateProvider, deserializeQuery } from 'hooks/useQueryState';

interface Props {
  branchId: string;
  initialState: {};
}

export default function ShoppingCartsListPage({ initialState }: Props) {
  return (
    <PageLayout>
      <Head>
        <I18n id="app.name" />
      </Head>
      <Body>
        <Aside>
          <Drawer />
        </Aside>
        <Main>
          <QueryStateProvider initialState={initialState}>
            <ShoppingCartsList />
          </QueryStateProvider>
        </Main>
      </Body>
    </PageLayout>
  );
}

ShoppingCartsListPage.getInitialProps = ({ query }) => ({
  initialState: deserializeQuery(query),
});
