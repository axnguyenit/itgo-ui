import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { fCurrency } from '../../utils/formatNumber';
import { Box, Button, CardHeader, Link, Stack, Typography } from '@mui/material';
import Image from '../../components/Image';
import MyAvatar from '../../components/MyAvatar';
import Iconify from '../../components/Iconify';
import { fDate } from '../../utils/formatTime';

CourseDetailsSummary.propTypes = {
	course: PropTypes.object.isRequired,
};

export default function CourseDetailsSummary({ course }) {
	return (
		<Stack spacing={4}>
			<Typography variant="h3">{course?.name}</Typography>
			<CardHeader
				disableTypography
				avatar={<MyAvatar />}
				title={
					<Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
						{`${course?.instructor.firstName} ${course?.instructor.lastName}`}
					</Link>
				}
				subheader={
					<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
						{fDate(course?.createdAt)}
					</Typography>
				}
				action={
					<Stack direction="row" spacing={2} sx={{ mr: 1 }}>
						<Typography variant="h4">
							<Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
								{course?.status === 'sale' && fCurrency(course?.price)}
							</Box>
							&nbsp; {fCurrency(course?.priceSale || course?.price)}
						</Typography>

						<Button startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />} variant="contained">
							Add to cart
						</Button>
					</Stack>
				}
				sx={{
					'&.MuiCardHeader-root': {
						p: 0,
					},
				}}
			/>

			<Image alt="post media" src={course?.cover} ratio="21/9" sx={{ borderRadius: 1 }} />
		</Stack>
	);
}
