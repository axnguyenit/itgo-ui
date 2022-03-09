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

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
	{
		value: 'paypal',
		title: 'Pay with Paypal',
		description: 'You will be redirected to PayPal website to complete your purchase securely.',
		icons: [`${window.location.origin}/assets/icons/ic_paypal.svg`],
	},
	{
		value: 'credit_card',
		title: 'Credit / Debit Card',
		description: 'We support Mastercard, Visa, Discover and Stripe.',
		icons: [
			`${window.location.origin}/assets/icons/ic_mastercard.svg`,
			`${window.location.origin}/assets/icons/ic_visa.svg`,
		],
	},
];

const CARDS_OPTIONS = [
	{ value: 'ViSa1', label: '**** **** **** 1212 - NGUYEN DINH KHA' },
	{ value: 'ViSa2', label: '**** **** **** 2424 - VUONG THAI' },
	{ value: 'MasterCard', label: '**** **** **** HUONG SEN' },
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
			handleNextStep();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<CheckoutPaymentMethods cardOptions={CARDS_OPTIONS} paymentOptions={PAYMENT_OPTIONS} />
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
