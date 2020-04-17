import React, { useCallback } from 'react';
import useQueryState from 'hooks/useQueryState';

type Props = React.Props<any>

export default function BranchDashboard(props: Props) {
  const [[foo], setFoo] = useQueryState('foo', 0);
  const inc = useCallback(() => setFoo(Math.random() * 10), [setFoo, foo]);
  return (
    <div>
      foo:
      {' '}
      {foo}
      {' '}
      <button type="button" onClick={inc} style={{ backgroundColor: 'red' }}>
        button
      </button>
    </div>
  );
}
