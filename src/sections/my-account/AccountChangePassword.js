import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Card, Alert, InputAdornment, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
// api
import userApi from '../../api/userApi';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const ChangePassWordSchema = Yup.object().shape({
		oldPassword: Yup.string().required('Old Password is required'),
		newPassword: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('New Password is required'),
		confirmNewPassword: Yup.string().oneOf(
			[Yup.ref('newPassword'), null],
			'Confirm password not match'
		),
	});

	const defaultValues = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	};

	const methods = useForm({
		resolver: yupResolver(ChangePassWordSchema),
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
			await userApi.changePassword(data);
			enqueueSnackbar('Update success!');
			reset();
		} catch (error) {
			console.error(error);
			setError('afterSubmit', error.errors);
		}
	};

	return (
		<Card sx={{ p: 3 }}>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3} alignItems="flex-end">
					{!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit[0].msg}</Alert>}
					<RHFTextField
						name="oldPassword"
						label="Old Password"
						type={showOldPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
										<Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<RHFTextField
						name="newPassword"
						label="New Password"
						type={showNewPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
										<Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<RHFTextField
						name="confirmNewPassword"
						label="Confirm New Password"
						type={showConfirmNewPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
										edge="end"
									>
										<Iconify icon={showConfirmNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<LoadingButton type="submit" variant="contained" loading={isSubmitting}>
						Save Changes
					</LoadingButton>
				</Stack>
			</FormProvider>
		</Card>
	);
}
