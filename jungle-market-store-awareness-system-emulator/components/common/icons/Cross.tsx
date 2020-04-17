import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}

function Cross({ className }: IProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fillRule="nonzero"
        d="M21.1107 2.8893c.5325.5326.581 1.3659.1452 1.9531l-.1452.1683L14.121 12l6.9897 6.9893c.5857.5858.5857 1.5356 0 2.1214-.5326.5325-1.3659.581-1.9531.1452l-.1683-.1452L12 14.121l-6.9893 6.9897c-.5858.5857-1.5356.5857-2.1214 0-.5325-.5326-.581-1.3659-.1452-1.9531l.1452-.1683L9.879 12 2.8893 5.0107c-.5857-.5858-.5857-1.5356 0-2.1214.5326-.5325 1.3659-.581 1.9531-.1452l.1683.1452L12 9.879l6.9893-6.9897c.5858-.5857 1.5356-.5857 2.1214 0z"
      />
    </svg>
  );
}

export default styled(Cross)`
  fill: currentColor;
  height: 2rem;
`;
