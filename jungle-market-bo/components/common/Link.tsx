import React from 'react';
import NLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface Props extends React.Props<any> {
  component?: any;
  activeOnSubRoutes?: boolean;
}

export default function Link({
  component: Component = 'a',
  href,
  children,
  activeOnSubRoutes = false,
  ...props
}: LinkProps & Props) {
  const { route } = useRouter();
  const isActive = activeOnSubRoutes ? route.startsWith(typeof href === 'string' ? href : href.pathname ?? '') : route === href;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NLink href={href} {...props}>
      <Component data-active={isActive}>
        {children}
      </Component>
    </NLink>
  );
}
