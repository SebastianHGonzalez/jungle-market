import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}

function Check({ className }: IProps) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fillRule="nonzero"
        d="M20.0141 3.4664c.7157-.6526 1.8517-.6158 2.5174.0815.656.6834.6187 1.7452-.0842 2.3863L8.5993 18.5335c-.7095.6358-1.8092.622-2.4774-.043L1.512 13.993c-.6822-.6616-.6822-1.7276-.003-2.3863.6925-.6784 1.827-.6784 2.5215-.0014l3.3972 3.3116L20.0141 3.4664z"
      />
    </svg>
  );
}

export default styled(Check)`
  fill: currentColor;
  height: 2rem;
`;
