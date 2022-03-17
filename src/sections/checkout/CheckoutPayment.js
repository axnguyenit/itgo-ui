import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { onGotoStep, onBackStep, onNextStep } from '../../redux/slices/cart';
// components
import Iconify from '../../components/Iconify';
import { FormProvider } from '../../components/hook-form';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import paymentApi from '../../api/paymentApi';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
	{
		value: 'momo',
		title: 'Pay with MoMo',
		description: 'You will be redirected to MoMo website to complete your purchase securely.',
		icons: [`${window.location.origin}/assets/images/logo-momo.png`],
	},
];

export default function CheckoutPayment() {
	const dispatch = useDispatch();

	const { total, discount, subtotal } = useSelector((state) => state.cart);

	const handleNextStep = () => {
		dispatch(onNextStep());
	};

	const handleBackStep = () => {
		dispatch(onBackStep());
	};

	const handleGotoStep = (step) => {
		dispatch(onGotoStep(step));
	};

	const PaymentSchema = Yup.object().shape({
		payment: Yup.string().required('Payment is required!'),
	});

	const defaultValues = {
		delivery: '',
		payment: '',
	};

	const methods = useForm({
		resolver: yupResolver(PaymentSchema),
		defaultValues,
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async () => {
		try {
			// handleNextStep();
			const response = await paymentApi.getPayUrl();
			if (response.data.success) window.location.href = response.data.payUrl;
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<CheckoutPaymentMethods paymentOptions={PAYMENT_OPTIONS} />
					<Button
						size="small"
						color="inherit"
						onClick={handleBackStep}
						startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
					>
						Back
					</Button>
				</Grid>

				<Grid item xs={12} md={4}>
					<CheckoutSummary
						enableEdit
						total={total}
						subtotal={subtotal}
						discount={discount}
						onEdit={() => handleGotoStep(0)}
					/>
					<LoadingButton
						fullWidth
						size="large"
						type="submit"
						variant="contained"
						loading={isSubmitting}
					>
						Complete Order
					</LoadingButton>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
