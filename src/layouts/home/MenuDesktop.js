import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, List, Stack, Popover, ListItem } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.primary,
	marginRight: theme.spacing(5),
	transition: theme.transitions.create('opacity', {
		duration: theme.transitions.duration.shorter,
	}),
	'&:hover': {
		opacity: 0.48,
		color: theme.palette.primary.main,
		textDecoration: 'none',
	},
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	marginTop: theme.spacing(3),
	color: theme.palette.text.secondary,
	transition: theme.transitions.create('color'),
	whiteSpace: 'nowrap',
	'&:hover': {
		color: theme.palette.primary.main,
	},
}));

// ----------------------------------------------------------------------

MenuDesktop.propTypes = {
	isHome: PropTypes.bool,
	isOffset: PropTypes.bool,
	navConfig: PropTypes.array,
};

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
	const { pathname } = useLocation();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			handleClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Stack direction="row">
			{navConfig.map((link) => (
				<MenuDesktopItem
					key={link.title}
					item={link}
					isOpen={open}
					onOpen={handleOpen}
					onClose={handleClose}
					isOffset={isOffset}
					isHome={isHome}
				/>
			))}
		</Stack>
	);
}

// ----------------------------------------------------------------------

IconBullet.propTypes = {
	type: PropTypes.oneOf(['item', 'subheader']),
};

function IconBullet({ type = 'item' }) {
	return (
		<Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
			<Box
				component="span"
				sx={{
					ml: '2px',
					width: 4,
					height: 4,
					borderRadius: '50%',
					bgcolor: 'currentColor',
					...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
				}}
			/>
		</Box>
	);
}

// ----------------------------------------------------------------------

MenuDesktopItem.propTypes = {
	isHome: PropTypes.bool,
	isOffset: PropTypes.bool,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	item: PropTypes.shape({
		path: PropTypes.string,
		title: PropTypes.string,
		children: PropTypes.array,
	}),
};

function MenuDesktopItem({ item, isHome, isOpen, isOffset, onOpen, onClose }) {
	const { title, path, children } = item;
	const menuRef = useRef(null);

	if (children) {
		return (
			<>
				<LinkStyle
					onClick={onOpen}
					ref={menuRef}
					sx={{
						display: 'flex',
						cursor: 'pointer',
						alignItems: 'center',
						textTransform: 'uppercase',
						...(isHome && { color: 'common.white' }),
						...(isOffset && { color: 'text.primary' }),
						...(isOpen && { opacity: 0.48, color: 'primary.main' }),
					}}
				>
					{title}
					<Iconify
						icon={isOpen ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
						sx={{ ml: 0.5, width: 16, height: 16 }}
					/>
				</LinkStyle>

				<Popover
					open={isOpen}
					anchorEl={menuRef.current}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
					onClose={onClose}
					PaperProps={{
						sx: {
							px: 4,
							pb: 3,
							borderRadius: 1,
							textTransform: 'uppercase',
							boxShadow: (theme) => theme.customShadows.z24,
						},
					}}
				>
					<List>
						{children[0].items.map((item) => (
							<ListItemStyle
								key={item.title}
								to={item.path}
								component={RouterLink}
								underline="none"
								sx={{
									'&.active': {
										color: 'text.primary',
										typography: 'subtitle2',
									},
								}}
							>
								{item.title}
							</ListItemStyle>
						))}
					</List>
				</Popover>
			</>
		);
	}

	return (
		<LinkStyle
			to={path}
			component={RouterLink}
			end={path === '/'}
			sx={{
				textTransform: 'uppercase',
				...(isHome && { color: 'common.white' }),
				...(isOffset && { color: 'text.primary' }),
				'&.active': {
					color: 'primary.main',
				},
			}}
		>
			{title}
		</LinkStyle>
	);
}
