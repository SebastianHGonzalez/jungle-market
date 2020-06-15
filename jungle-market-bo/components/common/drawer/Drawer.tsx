import React from 'react';
import styled from 'styled-components';

import {
  Menu, MenuOption,
} from 'components/common/layout';
import I18n from 'components/common/i18n';
import Link from 'components/common/Link';

import { primaryColor25 } from 'themes/selectors';

const A = styled.a`
  padding: 1em;
  cursor: pointer;

  &[data-active=true] {
    background-color: ${primaryColor25};
    margin-right: -4px;
  }
`;

export default function Drawer() {
  return (
    <Menu>
      <MenuOption>
        <Link href="/" component={A}>
          <I18n id="drawer.dashboard" />
        </Link>
      </MenuOption>
      <MenuOption>
        <Link href="/shopping-carts" component={A} activeOnSubRoutes>
          <I18n id="drawer.shoppingCarts" />
        </Link>
      </MenuOption>
    </Menu>
  );
}
