import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Stack, Avatar, CardHeader, Typography, Box, Divider, Rating } from '@mui/material';
import { _userCards } from '../../_mock';
import { CarouselArrows } from '../../components/carousel';

// @mui
import { styled } from '@mui/material/styles';
// utils
import cssStyles from '../../utils/cssStyles';
// components
import Image from '../../components/Image';
import SocialsButton from '../../components/SocialsButton';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

export default function HomeInstructorList() {
	const theme = useTheme();
	const carouselRef = useRef(null);

	const settings = {
		dots: false,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		rtl: Boolean(theme.direction === 'rtl'),
		adaptiveHeight: true,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: theme.breakpoints.values.lg,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: theme.breakpoints.values.md,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: theme.breakpoints.values.sm,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const handlePrevious = () => {
		carouselRef.current?.slickPrev();
	};

	const handleNext = () => {
		carouselRef.current?.slickNext();
	};

	return (
		<Box sx={{ textAlign: 'center' }}>
			<CardHeader
				title="Instructors"
				subheader={`${_userCards.length} Instructors`}
				sx={{
					'& .MuiCardHeader-action': {
						alignSelf: 'center',
					},
					'& .MuiCardHeader-title': {
						fontSize: 28,
					},
				}}
			/>
			<Divider sx={{ borderStyle: 'none', marginBottom: 2 }} />

			<Box sx={{ position: 'relative' }}>
				<CarouselArrows
					filled
					customIcon={'ic:round-keyboard-arrow-right'}
					onNext={handleNext}
					onPrevious={handlePrevious}
					sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
				>
					<Slider ref={carouselRef} {...settings}>
						{_userCards.map((teacher) => (
							<TeacherCard teacher={teacher} />
						))}
					</Slider>
				</CarouselArrows>
			</Box>
		</Box>
	);
}

const OverlayStyle = styled('div')(({ theme }) => ({
	...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
	top: 0,
	zIndex: 8,
	content: "''",
	width: '100%',
	height: '100%',
	position: 'absolute',
}));

// ----------------------------------------------------------------------

TeacherCard.propTypes = {
	teacher: PropTypes.object.isRequired,
};

function TeacherCard({ teacher }) {
	const { name, cover, position, avatarUrl } = teacher;

	return (
		<Card sx={{ textAlign: 'center', my: 3, mx: 1.5 }}>
			<Box sx={{ position: 'relative' }}>
				<SvgIconStyle
					src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
					sx={{
						width: 144,
						height: 62,
						zIndex: 10,
						left: 0,
						right: 0,
						bottom: -26,
						mx: 'auto',
						position: 'absolute',
						color: 'background.paper',
					}}
				/>
				<Avatar
					alt={name}
					src={avatarUrl}
					sx={{
						width: 64,
						height: 64,
						zIndex: 11,
						left: 0,
						right: 0,
						bottom: -32,
						mx: 'auto',
						position: 'absolute',
					}}
				/>
				<OverlayStyle />
				<Image src={cover} alt={cover} ratio="16/9" />
			</Box>

			<Typography variant="subtitle1" sx={{ mt: 6 }}>
				{name}
			</Typography>

			<Typography variant="body2" sx={{ color: 'text.secondary' }}>
				{position}
			</Typography>

			<Stack alignItems="center">
				<SocialsButton initialColor sx={{ my: 2.5 }} />
			</Stack>

			<Divider sx={{ borderStyle: 'dashed', marginBottom: 1 }} />
			<Rating size="small" value={4.5} precision={0.1} readOnly />
		</Card>
	);
}
