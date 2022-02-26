import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { fCurrency } from 'src/utils/formatNumber';
import { Box, Button, CardHeader, Link, Stack, Typography } from '@mui/material';
import Image from 'src/components/Image';
import MyAvatar from 'src/components/MyAvatar';
import Iconify from 'src/components/Iconify';

// CourseDetailsSummary.propTypes = {};

export default function CourseDetailsSummary(props) {
	return (
		<Stack spacing={4}>
			<Typography variant="h3">TypeScript</Typography>
			<CardHeader
				disableTypography
				avatar={<MyAvatar />}
				title={
					<Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
						Kha NGUYEN DINH
					</Link>
				}
				subheader={
					<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
						{/* {fDate(post.createdAt)} */} 04 November 2021
					</Typography>
				}
				action={
					<Stack direction="row" spacing={2} sx={{ mr: 1 }}>
						<Typography variant="h4">
							<Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
								{fCurrency(20.22)}
							</Box>
							&nbsp;{fCurrency(18.54)}
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

			<Image
				alt="post media"
				src="https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/courses%2Ftypescript.png?alt=media&token=bfcc7ba7-04ff-4cf0-b0d7-1def58e9310f"
				ratio="21/9"
				sx={{ borderRadius: 1 }}
			/>
		</Stack>
	);
}
