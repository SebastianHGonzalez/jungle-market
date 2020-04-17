import React from "react";
import styled from "styled-components";

import I18n from "components/common/i18n";

const Span = styled.span`
  color: ${({ theme: { neutral75 } }) => neutral75};
`;

interface IProps {
  pageSize: number,
  count: number,
}

export default function ResultsCount({ pageSize, count }: IProps) {
  return (
    <Span>
      <I18n id="results.count" fillers={{ pageSize, count }} />
    </Span>
  )
}