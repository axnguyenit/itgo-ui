import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
import userApi from '../../api/userApi';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
	onSent: PropTypes.func,
	id: PropTypes.string,
	token: PropTypes.string,
};

export default function ResetPasswordForm({ onSent, id, token }) {
	const isMountedRef = useIsMountedRef();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const ResetPasswordSchema = Yup.object().shape({
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string()
			.required('Confirm password is required')
			.oneOf([Yup.ref('password'), null], 'Confirm password not match'),
	});

	const methods = useForm({
		resolver: yupResolver(ResetPasswordSchema),
		defaultValues: { email: '' },
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data) => {
		try {
			if (isMountedRef.current) {
				await userApi.resetPassword(data, id, token);
				onSent();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				<RHFTextField
					name="password"
					label="Password"
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
									<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<RHFTextField
					name="confirmPassword"
					label="Confirm password"
					type={showConfirmPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
									<Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

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
