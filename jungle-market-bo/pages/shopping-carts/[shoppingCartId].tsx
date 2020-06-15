import React from 'react';

import I18n from 'components/common/i18n';
import { PageLayout, Head, Main, Body, Aside } from 'components/common/layout';
import Drawer from 'components/common/drawer';
import ShoppingCart from 'components/shopping-cart';

import { QueryStateProvider, deserializeQuery } from 'hooks/useQueryState';

interface Props {
  shoppingCartId: string;
  initialState: {};
}

export default function ShoppingCartPage({ initialState, shoppingCartId }: Props) {
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
            <ShoppingCart id={shoppingCartId} />
          </QueryStateProvider>
        </Main>
      </Body>
    </PageLayout>
  );
}

ShoppingCartPage.getInitialProps = ({ query: { shoppingCartId, ...query } }) => ({
  initialState: deserializeQuery(query),
  shoppingCartId,
});
