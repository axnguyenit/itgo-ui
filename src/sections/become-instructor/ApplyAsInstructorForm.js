import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// components
import { FormProvider, RHFTextField, RHFUploadButton } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
// api
import applicationApi from '../../api/applicationApi';

// ----------------------------------------------------------------------

export default function ApplyAsInstructorForm() {
	const { enqueueSnackbar } = useSnackbar();
	const { dispatch, user } = useAuth();

	const ApplyFormSchema = Yup.object().shape({
		position: Yup.string().required('Working position is required'),
		cv: Yup.mixed().required('CV is required'),
	});

	const defaultValues = {
		position: '',
		cv: '',
	};

	const methods = useForm({
		resolver: yupResolver(ApplyFormSchema),
		defaultValues,
	});

	const {
		reset,
		setValue,
		setError,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data) => {
		try {
			await applicationApi.add(data);
			reset();
			enqueueSnackbar('Request sent successfully');
			dispatch({
				type: 'INITIALIZE',
				payload: {
					user: { ...user, isApply: true },
					isAuthenticated: true,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const ext = file.type.split('/')[1];
		if (ext === 'pdf') {
			setError('cv', { message: '' });
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => setValue('cv', reader.result);
			reader.onerror = (error) => console.error(error);
		} else {
			event.target.value = '';
			setError('cv', { message: 'File type must be PDF' });
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				<Stack spacing={3}>
					<Card sx={{ p: 3 }}>
						<Stack spacing={3} mt={2}>
							<RHFTextField name="position" label="Working position" />
							<RHFUploadButton name="cv" label="Upload CV" onChange={handleFileChange} />
						</Stack>
					</Card>

					<LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
						Apply
					</LoadingButton>
				</Stack>
			</Stack>
		</FormProvider>
	);
}
