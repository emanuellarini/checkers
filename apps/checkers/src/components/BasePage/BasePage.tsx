import React from 'react';

import { DefaultGameHeaderLayout, DefaultHeaderLayout } from '../';

type BasePageProps = {
  children: React.ReactNode;
  isGame?: boolean;
};

export const BasePage: React.FC<BasePageProps> = ({ children, isGame }) => {
  const LayoutComponent = isGame
    ? DefaultGameHeaderLayout
    : DefaultHeaderLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};
