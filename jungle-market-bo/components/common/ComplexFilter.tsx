import React from "react";
import styled from "styled-components";

import ContextualMenu from "components/common/layout/ContextualMenu";
import I18n from "components/common/i18n";
import { InputWrapper, Input } from "components/common/input/TextInput";
import Chevron from "components/common/icons/Chevron";

import { primaryColor, primaryColorContrast } from "themes/selectors";

interface IProps extends React.Props<unknown> {
  label: string;
}

const DownChevron = styled(Chevron)`
  transform: rotateX(180deg);
`;

const ComplexFilterWrapper = styled(InputWrapper)`
  align-items: center;
  border-radius: 4px;
  position: relative;
  transition: all 0s;

  ${ContextualMenu} {
    color: black;
    display: none;
  }
  &:hover {
    background-color: ${primaryColor};
    color: ${primaryColorContrast};

    ${ContextualMenu} {
      display: block;
    }
  }
`;

const Label = styled(Input).attrs({ as: "span" })`
  padding: 0.75rem 0.5rem;
`;

export default function ComplexFilter({ children, label }: IProps) {
  return (
    <ComplexFilterWrapper>
      <Label as="span">
        <I18n id={label} />
      </Label>
      <DownChevron />
      <ContextualMenu open>{children}</ContextualMenu>
    </ComplexFilterWrapper>
  );
}
