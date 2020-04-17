import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}

function Chevron({ className }: IProps) {
  return (
    <svg className={className} viewBox="0 0 25 25">
      <path d="M12.5 0C19.403 0 25 5.601 25 12.503S19.403 25 12.5 25 0 19.399 0 12.497 5.597 0 12.5 0zm0 2.262c-5.655 0-10.238 4.587-10.238 10.24 0 5.655 4.583 10.236 10.238 10.236 5.655 0 10.238-4.587 10.238-10.24-.006-5.649-4.589-10.23-10.238-10.236zm-.047 13.604c1.11 0 1.84.798 1.864 1.912 0 1.091-.73 1.912-1.864 1.912-1.133 0-1.886-.82-1.886-1.912 0-1.114.776-1.912 1.886-1.912zm1.653-10.58l-.461 9.53h-2.39l-.478-9.53h3.33z" />
    </svg>
  );
}

export default styled(Chevron)`
  fill: currentColor;
  height: 2rem;
`;
