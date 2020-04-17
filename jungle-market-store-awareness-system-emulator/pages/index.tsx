import React from 'react';

import I18n from 'components/common/i18n';
import { PageLayout, Head } from 'components/common/layout';
import EmulatorDashboard from 'components/emulator-dashboard';

import { QueryStateProvider, deserializeQuery } from 'hooks/useQueryState';

interface Props {
  initialState: {};
}

export default function EmulatorDashboardPage({ initialState }: Props) {
  return (
    <PageLayout>
      <Head>
        <I18n id="app.name" />
      </Head>
      <QueryStateProvider initialState={initialState}>
        <EmulatorDashboard />
      </QueryStateProvider>
    </PageLayout>
  );
}

EmulatorDashboardPage.getInitialProps = ({ query }: { query: {} }) => ({
  initialState: deserializeQuery(query),
});
