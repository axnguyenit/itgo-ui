import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
// routes
import { PATH_HOME } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { addCart } from '../../redux/slices/cart';
// api
import cartApi from '../../api/cartApi';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Label from '../../components/Label';
import Image from '../../components/Image';
import useAuth from '../../hooks/useAuth';
import { PATH_AUTH } from '../../routes/paths';
import cloudinary from '../../utils/cloudinary';

// ----------------------------------------------------------------------

CourseCard.propTypes = {
	course: PropTypes.object,
};

export default function CourseCard({ course }) {
	const { _id, name, cover, price, priceSale, instructor } = course;
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	const linkTo = `${PATH_HOME.courses.root}/${_id}`;

	const handleAddCart = async (course) => {
		const isExisted = cart.find((cartItem) => cartItem.course._id === course._id);

		if (!isExisted) {
			try {
				const data = {
					total: cart.length + 1,
					courseId: course._id,
				};
				const response = await cartApi.add(data);
				const cartItem = {
					_id: response.data.cartItem._id,
					cartId: response.data.cartItem.cartId,
					course,
				};
				enqueueSnackbar('Add to cart successfully');
				dispatch(addCart(cartItem));
			} catch (error) {
				console.error(error);
				isAuthenticated
					? enqueueSnackbar(error?.errors[0]?.msg, { variant: 'warning' })
					: navigate(PATH_AUTH.login);
			}
		} else {
			enqueueSnackbar('This course already exists in your cart', { variant: 'info' });
		}
	};

	return (
		<Card>
			<Box sx={{ position: 'relative' }}>
				{!!priceSale && (
					<Label
						variant="filled"
						color="error"
						sx={{
							top: 16,
							right: 16,
							zIndex: 9,
							position: 'absolute',
							textTransform: 'uppercase',
						}}
					>
						Sale
					</Label>
				)}
				<Image alt={name} src={cloudinary.w300(cover)} ratio="16/9" />
			</Box>

			<Stack spacing={2} sx={{ p: 2 }}>
				<Box sx={{ flexGrow: 1, minWidth: 0 }}>
					<Link to={linkTo} color="inherit" component={RouterLink}>
						<Typography variant="subtitle2" noWrap>
							{name}
						</Typography>
					</Link>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
							{instructor?.firstName} {instructor?.lastName}
						</Typography>
					</Box>
				</Box>

				<Stack direction="row" alignItems="flex-end" justifyContent="space-between">
					<Stack direction="row" alignItems="flex-end" spacing={0.5}>
						{!!priceSale && (
							<Typography
								variant="body2"
								sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
							>
								{fCurrency(price)}
							</Typography>
						)}
						<Typography variant="subtitle1">{fCurrency(priceSale || price)}</Typography>
					</Stack>
					{/* <Rating value={4.5} size="small" precision={0.1} readOnly /> */}

					<Box sx={{ flexGrow: 1 }} />
					<Button variant="contained" onClick={() => handleAddCart(course)} size="small">
						Add to cart
					</Button>
				</Stack>
			</Stack>
		</Card>
	);
}
