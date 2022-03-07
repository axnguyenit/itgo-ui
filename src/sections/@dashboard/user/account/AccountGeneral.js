import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
	const { enqueueSnackbar } = useSnackbar();

	const { user } = useAuth();

	const UpdateUserSchema = Yup.object().shape({
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
	});

	const defaultValues = {
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		photoURL: user?.photoURL || '',
		phoneNumber: user?.phoneNumber || '',
		address: user?.address || '',
		state: user?.state || '',
	};

	const methods = useForm({
		resolver: yupResolver(UpdateUserSchema),
		defaultValues,
	});

	const {
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async () => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			enqueueSnackbar('Update success!');
		} catch (error) {
			console.error(error);
		}
	};

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				setValue(
					'photoURL',
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				);
			}
		},
		[setValue]
	);

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Card sx={{ py: 9.125, px: 3, textAlign: 'center' }}>
						<RHFUploadAvatar
							name="photoURL"
							accept="image/*"
							maxSize={3145728}
							onDrop={handleDrop}
							helperText={
								<Typography
									variant="caption"
									sx={{
										mt: 2,
										mx: 'auto',
										display: 'block',
										textAlign: 'center',
										color: 'text.secondary',
									}}
								>
									Allowed *.jpeg, *.jpg, *.png, *.gif
								</Typography>
							}
						/>
					</Card>
				</Grid>

				<Grid item xs={12} md={8}>
					<Card sx={{ p: 3 }}>
						<Box
							sx={{
								display: 'grid',
								rowGap: 3,
								columnGap: 2,
								gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
							}}
						>
							<RHFTextField name="firstName" label="First name" />
							<RHFTextField name="lastName" label="Last name" />
							<RHFTextField name="email" label="Email Address" />

							<RHFTextField name="phoneNumber" label="Phone Number" />
							<RHFTextField name="address" label="Address" />

							<RHFTextField name="state" label="State/Region" />
						</Box>

						<Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
							<LoadingButton type="submit" variant="contained" loading={isSubmitting}>
								Save Changes
							</LoadingButton>
						</Stack>
					</Card>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
