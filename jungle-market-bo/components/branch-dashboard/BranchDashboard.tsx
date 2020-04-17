import React, { useCallback } from 'react';
import useQueryState from 'hooks/useQueryState';

interface Props extends React.Props<any> {
  branchId: string;
}

export default function BranchDashboard({ branchId }: Props) {
  const [[foo], setFoo] = useQueryState('foo', 0);
  const inc = useCallback(() => setFoo(Math.random() * 10), [setFoo, foo]);
  return (
    <div>
      foo:
      {' '}
      {foo}
      {' '}
      BranchDashboard:
      {branchId}
      <button type="button" onClick={inc} style={{ backgroundColor: "red" }}>button</button>
    </div>
  );
}
