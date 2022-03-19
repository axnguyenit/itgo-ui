import { useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { deleteCart, onNextStep } from '../../redux/slices/cart';
// routes
import { PATH_HOME } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import EmptyContent from '../../components/EmptyContent';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutCourseList from './CheckoutCourseList';
import cartApi from '../../api/cartApi';
import paymentApi from '../../api/paymentApi';
import { getCartApi } from '../../redux/slices/cart';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [searchParams, setSearchParams] = useSearchParams();
	const { cart, total, discount, subtotal } = useSelector((state) => state.cart);
	const totalItems = cart.length;
	const isEmptyCart = cart.length === 0;

	const resultCode = searchParams.get('resultCode');

	// transId, amount, orderId

	const storeTransaction = async () => {
		if (resultCode && Number(resultCode) >= 0 && cart.length) {
			try {
				const transId = searchParams.get('transId');
				const message = searchParams.get('message');
				const amount = searchParams.get('amount');
				const data = {
					transId,
					message,
					amount,
					resultCode,
					cart,
				};

				const response = await paymentApi.add(data);
				if (response.data.success) {
					setSearchParams({});
					getCartApi();
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		storeTransaction();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resultCode, cart]);

	const handleDeleteCart = async (cartItemId) => {
		try {
			const response = await cartApi.removeItem(cartItemId);
			if (response.data.success) {
				dispatch(deleteCart(cartItemId));
			}
		} catch (error) {
			enqueueSnackbar(error.errors[0].msg, { variant: 'warning' });
		}
	};

	const handleNextStep = () => {
		dispatch(onNextStep());
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={8}>
				<Card sx={{ mb: 3 }}>
					<CardHeader
						title={
							<Typography variant="h6">
								Shopping Cart
								<Typography component="span" sx={{ color: 'text.secondary' }}>
									&nbsp;({totalItems} courses)
								</Typography>
							</Typography>
						}
						sx={{ mb: 3 }}
					/>

					{!isEmptyCart ? (
						<Scrollbar>
							<CheckoutCourseList courses={cart} onDelete={handleDeleteCart} />
						</Scrollbar>
					) : (
						<EmptyContent
							title="Cart is empty"
							description="Look like you have no items in your shopping cart."
							img={`${window.location.origin}/assets/images/illustration_empty_cart.svg`}
						/>
					)}
				</Card>

				<Button
					color="inherit"
					component={RouterLink}
					to={PATH_HOME.courses.root}
					startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
				>
					Continue Shopping
				</Button>
			</Grid>

			<Grid item xs={12} md={4}>
				<CheckoutSummary enableDiscount total={total} discount={discount} subtotal={subtotal} />
				<Button
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					disabled={cart.length === 0}
					onClick={handleNextStep}
				>
					Check Out
				</Button>
			</Grid>
		</Grid>
	);
}
