import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import userApi from '../../api/userApi';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function RegisterForm() {
	const isMountedRef = useIsMountedRef();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string()
			.required('First name is required')
			.min(2, 'First name must be at least 2 characters'),
		lastName: Yup.string()
			.required('Last name is required')
			.min(2, 'Last name must be at least 2 characters'),
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string()
			.required('Confirm password is required')
			.oneOf([Yup.ref('password'), null], 'Confirm password not match'),
	});

	const defaultValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	};

	const methods = useForm({
		resolver: yupResolver(RegisterSchema),
		defaultValues,
	});

	const {
		reset,
		setError,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	const onSubmit = async (data) => {
		try {
			await userApi.register(data);
			navigate({
				pathname: PATH_AUTH.verify,
				search: createSearchParams({ status: 'sent', email: data.email }).toString(),
			});
			reset();
		} catch (error) {
			console.error(error);
			if (isMountedRef.current) setError('afterSubmit', error.errors);
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				{!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit[0].msg}</Alert>}

				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					<RHFTextField name="firstName" label="First name" />
					<RHFTextField name="lastName" label="Last name" />
				</Stack>

				<RHFTextField name="email" label="Email address" />

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
					Register
				</LoadingButton>
			</Stack>
		</FormProvider>
	);
}
