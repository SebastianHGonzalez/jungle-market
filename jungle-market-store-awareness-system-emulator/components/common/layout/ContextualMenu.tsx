import React from "react";
import styled from "styled-components";

import { separatorColor } from "themes/selectors";

interface IProps extends React.Props<any> {
  open: boolean;
  side?: "left" | "right" | "top" | "bottom";
  children?: React.ReactNode;
}

const ContextualMenu: any = styled.div.attrs<IProps>(
  ({ open }) => ({
    open: undefined,
    style: { display: open ? undefined : "none" },
    ariaHidden: !open
  })
)`
  background-color: white;
  position: absolute;
  border: 1px solid ${separatorColor};
  padding: 16px;
  width: max-content;
  z-index: 100;
  width: 100%;

  ${({ side }: any) => {
    switch (side) {
      case "left":
        return "right: 100%;";
      case "right":
        return "left: 100%;";
      case "top":
        return "bottom: 100%;";
      case "bottom":
      default:
        return "top: 100%;";
    }
  }}
`;

ContextualMenu.defaultProps = {
  open: true,
  side: "bottom",
  children: undefined,
  ariaLive: true,
  role: "menu"
} as any;

export default ContextualMenu;
