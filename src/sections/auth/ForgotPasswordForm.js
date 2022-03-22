import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import userApi from '../../api/userApi';

// ----------------------------------------------------------------------

ForgotPasswordForm.propTypes = {
	onSent: PropTypes.func,
	onGetEmail: PropTypes.func,
};

export default function ForgotPasswordForm({ onSent, onGetEmail }) {
	const isMountedRef = useIsMountedRef();

	const ForgotPasswordSchema = Yup.object().shape({
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
	});

	const methods = useForm({
		resolver: yupResolver(ForgotPasswordSchema),
		defaultValues: { email: '' },
	});

	const {
		setError,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	const onSubmit = async (data) => {
		try {
			await userApi.forgotPassword(data);
			if (isMountedRef.current) {
				onSent();
				onGetEmail(data.email);
			}
		} catch (error) {
			console.error(error);
			setError('afterSubmit', error.errors);
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				{!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit[0].msg}</Alert>}
				<RHFTextField name="email" label="Email address" />

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isSubmitting}
				>
					Reset Password
				</LoadingButton>
			</Stack>
		</FormProvider>
	);
}
