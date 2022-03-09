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
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { addCart } from '../../redux/slices/cart';
// api
import cartApi from 'src/api/cartApi';

CourseDetailsSummary.propTypes = {
	course: PropTypes.object.isRequired,
};

export default function CourseDetailsSummary({ course }) {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);

	const handleAddCart = async (course) => {
		const isExisted = cart.find((cartItem) => cartItem.course._id === course._id);

		if (!isExisted) {
			try {
				const data = {
					total: cart.length + 1,
					courseId: course._id,
				};
				const response = await cartApi.add(data);

				if (response.data.success) {
					const cartItem = {
						_id: response.data.cartItem._id,
						cartId: response.data.cartItem.cartId,
						course,
					};
					enqueueSnackbar('Add to cart successfully');
					dispatch(addCart(cartItem));
				}
			} catch (error) {
				console.error(error);
				enqueueSnackbar(error.errors[0].msg, { variant: 'warning' });
			}
		} else {
			enqueueSnackbar('This course already exists in your cart', { variant: 'info' });
		}
	};

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

						<Button
							startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
							variant="contained"
							onClick={() => handleAddCart(course)}
						>
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
