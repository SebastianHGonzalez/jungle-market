import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}

function Dots({ className }: IProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <circle r="1.6" cx="6" cy="12" />
      <circle r="1.6" cx="12" cy="12" />
      <circle r="1.6" cx="18" cy="12" />
    </svg>
  );
}

export default styled(Dots)`
  fill: currentColor;
  height: 2rem;
`;
