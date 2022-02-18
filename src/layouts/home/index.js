import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// config
import { HEADER } from '../../config';
//
import HomeHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';
import MainFooter from '../main/MainFooter';

// ----------------------------------------------------------------------

export default function HomeLayout() {
	const isDesktop = useResponsive('up', 'lg');

	const [open, setOpen] = useState(false);

	return (
		<>
			<HomeHeader onOpenSidebar={() => setOpen(true)} verticalLayout={true} />

			{!isDesktop && <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />}

			<Box
				component="main"
				sx={{
					px: { lg: 2 },
					pt: `${HEADER.MOBILE_HEIGHT + 24}px`,
				}}
			>
				<Outlet />
				<MainFooter />
			</Box>
		</>
	);
}
