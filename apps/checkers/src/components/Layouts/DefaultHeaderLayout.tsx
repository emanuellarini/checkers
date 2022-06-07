import React from 'react';

import { Container } from '@mui/material';

import { DefaultHeader } from './DefaultHeader';

type DefaultHeaderLayoutProps = {
  children: React.ReactNode;
};

export const DefaultHeaderLayout: React.FC<DefaultHeaderLayoutProps> = ({
  children
}) => (
  <>
    <DefaultHeader />
    <Container component="main">{children}</Container>
  </>
);
