import React from "react";
import styled from "styled-components";

const HiddenInput = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
`;

const CustomCheckbox = styled.span`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.separator};
  border-radius: 4px;
  height: 1em;
  left: 0px;

  position: absolute;
  top: 0px;
  width: 1em;

  ${HiddenInput}:checked ~ & {
    background-color: #409;
    border: 1px solid #409;
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  &::after {
    content: "";
    height: 0px;
    left: 0.5em;
    opacity: 1;
    position: absolute;
    top: 0.5em;

    transform: rotate(0deg) scale(0);
    width: 0px;
  }

  ${HiddenInput}:checked ~ &::after {
    background-color: transparent;
    border: solid white;
    border-radius: 0;
    border-width: 0 2px 2px 0;
    height: 0.5em;
    left: 0.33em;

    opacity: 1;
    top: 0.125em;
    transform: rotate(45deg) scale(1);
    width: 0.25em;
  }
`;

const CheckboxWrapper = styled.label`
  display: inline-block;
  font-size: 1.1em;
  height: 1em;

  line-height: 2em;
  position: relative;
  width: 1em;
`;

interface IProps extends React.Props<any> {
  className?: string;
  id: string;
  value: string;
  name: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  className,
  id,
  value,
  name,
  checked,
  onChange,
  ...props
}: IProps) {
  return (
    <CheckboxWrapper className={className}>
      <HiddenInput
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        {...(props as any)}
      />
      <CustomCheckbox />
    </CheckboxWrapper>
  );
}
