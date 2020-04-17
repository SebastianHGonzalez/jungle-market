import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
}

function Chevron({ className }: IProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
    </svg>
  );
}

export default styled(Chevron)`
  fill: currentColor;
  height: 2rem;
`;
