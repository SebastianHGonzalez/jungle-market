import React from 'react';
import styled from 'styled-components';

import Title from '../typography/Title';

interface Props {
  className?: string;
}

function Brand({ className }: Props) {
  return <Title className={className}>Jungle Market</Title>;
}

export default styled(Brand)``;
