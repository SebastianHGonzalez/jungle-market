import React from 'react';

import I18n from 'components/common/i18n';
import { PageLayout, Head } from 'components/common/layout';
import BranchDashboard from 'components/branch-dashboard';

import { QueryStateProvider, deserializeQuery } from 'hooks/useQueryState';

interface Props {
  branchId: string;
  initialState: {};
}

export default function BranchDashboardPage({ initialState, branchId }: Props) {
  return (
    <PageLayout>
      <Head>
        <I18n id="app.name" />
      </Head>
      <QueryStateProvider initialState={initialState}>
        <BranchDashboard branchId={branchId} />
      </QueryStateProvider>
    </PageLayout>
  );
}

BranchDashboardPage.getInitialProps = ({
  query: { branchId, ...query },
}: {
  query: { branchId: string };
}) => ({
  branchId,
  initialState: deserializeQuery(query),
});
