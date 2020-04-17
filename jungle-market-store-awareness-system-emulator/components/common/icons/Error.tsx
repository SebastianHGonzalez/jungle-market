import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}

function Chevron({ className }: IProps) {
  return (
    <svg className={className} viewBox="0 0 25 25">
      <path d="M12.5 0C5.597 0 0 5.597 0 12.5S5.597 25 12.5 25 25 19.403 25 12.5 19.403 0 12.5 0zm0 22.744c-5.655 0-10.238-4.583-10.238-10.238C2.262 6.85 6.845 2.262 12.5 2.262c5.65.006 10.232 4.589 10.238 10.238 0 5.655-4.583 10.244-10.238 10.244z" />
      <path d="M17.356 15.342L14.471 12.457 17.356 9.579 15.433 7.656 12.548 10.54 9.664 7.656 7.741 9.579 10.625 12.457 7.741 15.342 9.664 17.271 12.548 14.38 15.433 17.271z" />
    </svg>
  );
}

export default styled(Chevron)`
  fill: currentColor;
  height: 2rem;
`;
