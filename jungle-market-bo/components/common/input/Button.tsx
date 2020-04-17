import { string, oneOf, bool } from "prop-types";
import styled, { css } from "styled-components";

const ButtonColors = css`
  background: ${({ theme, variant, color, disabled }: any) =>
    theme.button[variant][color].background[disabled ? "disabled" : "enabled"]};
  border: 1px solid
    ${({ theme, variant, color, disabled }: any) =>
      theme.button[variant][color].border[disabled ? "disabled" : "enabled"]};
  color: ${({ theme, variant, color, disabled }: any) =>
    theme.button[variant][color].text[disabled ? "disabled" : "enabled"]};
  &:hover {
    background: ${({ theme, variant, color, disabled }: any) =>
      theme.button[variant][color].highlight.background[
        disabled ? "disabled" : "enabled"
      ]};
    border: 1px solid
      ${({ theme, variant, color, disabled }: any) =>
        theme.button[variant][color].highlight.border[
          disabled ? "disabled" : "enabled"
        ]};
    color: ${({ theme, variant, color, disabled }: any) =>
      theme.button[variant][color].highlight.text[
        disabled ? "disabled" : "enabled"
      ]};
  }
`;

const ButtonText = css`
  font-stretch: normal;
  font-style: normal;
  font-weight: 600;
  justify-content: center;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;

  ${({ variant }: any) => (variant === "link" ? "text-transform: unset;" : "")}
`;

const ButtonPadding = css`
  ${({ size, variant }: any) => {
    if(variant === "link") return '';

    return `padding: ${size === "small" ? '0.1rem' : '0.5rem'};`
  }}
`;

const Button: any = styled.button`
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  transition: background-color 0.2s;

  ${ButtonColors}
  ${ButtonText}
  ${ButtonPadding}
`;

Button.propTypes = {
  className: string,
  color: oneOf(["primary", "secondary", "neutral"]),
  variant: oneOf(["filled", "outlined", "flat", "link"]),
  size: oneOf(["small", "normal"]),
  disabled: bool,
  iconOnly: bool
};

Button.defaultProps = {
  className: undefined,
  type: "button",
  color: "primary",
  variant: "filled",
  size: "normal",
  disabled: false,
  iconOnly: false
};

export default Button;
