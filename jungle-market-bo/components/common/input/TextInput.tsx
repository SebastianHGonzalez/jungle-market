import React, { ChangeEvent } from "react";
import { string, bool } from "prop-types";
import styled, { css } from "styled-components";

import Loader from "components/common/icons/Loader";
import Close from "components/common/icons/Close";
import I18n from "components/common/i18n";

type Value = string | number;

export interface TextInputProps {
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  loading?: boolean;
  error?: string;
  value?: Value;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputCss = css`
  background-color: transparent;
  border: none;
  flex-grow: 1;
  font-size: 1em;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  letter-spacing: -0.35px;
  line-height: 1.25;
  min-width: 0;

  outline: none;
  padding: 0.5rem;

  text-align: inherit;

  &:focus,
  &:hover {
    box-shadow: inset 0 0 2px ${({ theme }) => theme.primary};
  }
  &:disabled {
    box-shadow: unset;
  }
  &:read-only {
    box-shadow: unset;
  }
  &:-moz-read-only {
    box-shadow: unset;
  }
  transition: 0.3s ${({ theme }) => theme.bezier.fast};

  ${({ theme, error }: any) =>
    error ? `box-shadow: inset 0 0 2px ${theme.errorContrast};` : ""}
`;

export const Input = styled.input<TextInputProps>`
  ${InputCss}
`;

export const InputWrapper = styled.div<TextInputProps>`
  align-items: stretch;
  display: inline-flex;
  min-width: 0;
  transition: 0.5s ${({ theme }) => theme.bezier.fast};

  ${({ theme }) => `border: 1px solid ${theme.table.separator}`};
  ${({ theme, error }) =>
    error ? `box-shadow: inset 0 0 2px ${theme.errorContrast};` : ""}
`;

function TextInput({ className, loading, error, ...props }: TextInputProps) {
  return (
    <InputWrapper className={className}>
      <Input type="text" {...props} error={error} className={className} />
      {error && <Close />}
      {loading && <Loader />}
    </InputWrapper>
  );
}

TextInput.propTypes = {
  className: string,
  loading: bool,
  error: bool
};

TextInput.defaultProps = {
  className: undefined,
  loading: false,
  error: false
};

export default TextInput;
