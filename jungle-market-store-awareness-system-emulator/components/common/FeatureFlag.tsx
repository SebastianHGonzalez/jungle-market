import React from 'react';

import useFeature from 'hooks/useFeature';

interface IProps extends React.Props<any> {
  id: string;
}

export default function FeatureFlag({ id, children }: IProps) {
  const [isEnabled] = useFeature(id);
  return <>{isEnabled && children}</>;
}
