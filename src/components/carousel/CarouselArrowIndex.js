import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Typography, Box, IconButton } from '@mui/material';
//
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
	zIndex: 9,
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	bottom: theme.spacing(2),
	right: theme.spacing(2),
	color: theme.palette.common.white,
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.grey[900], 0.48),
}));

const ArrowStyle = styled(IconButton)(({ theme }) => ({
	padding: 6,
	opacity: 0.48,
	color: theme.palette.common.white,
	'&:hover': { opacity: 1 },
}));

// ----------------------------------------------------------------------

CarouselArrowIndex.propTypes = {
	customIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	index: PropTypes.number,
	onNext: PropTypes.func,
	onPrevious: PropTypes.func,
	total: PropTypes.number,
};

export default function CarouselArrowIndex({
	index,
	total,
	onNext,
	onPrevious,
	customIcon,
	...other
}) {
	return (
		<RootStyle {...other}>
			<ArrowStyle size="small" onClick={onPrevious}>
				{leftIcon(customIcon)}
			</ArrowStyle>

			<Typography variant="subtitle2">
				{index + 1}/{total}
			</Typography>

			<ArrowStyle size="small" onClick={onNext}>
				{rightIcon(customIcon)}
			</ArrowStyle>
		</RootStyle>
	);
}

// ----------------------------------------------------------------------

const leftIcon = (customIcon) => (
	<Iconify
		icon={customIcon || 'eva:arrow-right-fill'}
		sx={{
			width: 20,
			height: 20,
			transform: ' scaleX(-1)',
		}}
	/>
);

const rightIcon = (customIcon) => (
	<Iconify
		icon={customIcon || 'eva:arrow-right-fill'}
		sx={{
			width: 20,
			height: 20,
		}}
	/>
);
