import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER } from '../../../config';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={navConfig} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
