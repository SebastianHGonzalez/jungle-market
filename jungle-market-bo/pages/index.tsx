import React from 'react';

import I18n from 'components/common/i18n';
import { PageLayout, Head, Main, Body, Aside } from 'components/common/layout';
import Drawer from 'components/common/drawer';
import Dashboard from 'components/dashboard';

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
      <Body>
        <Aside>
          <Drawer />
        </Aside>
        <Main>
          <QueryStateProvider initialState={initialState}>
            <Dashboard />
          </QueryStateProvider>
        </Main>
      </Body>
    </PageLayout>
  );
}

BranchDashboardPage.getInitialProps = ({ query }) => ({
  initialState: deserializeQuery(query),
});
