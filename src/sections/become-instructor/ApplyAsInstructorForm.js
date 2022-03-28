import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Stack, Typography } from '@mui/material';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
import technologyApi from '../../api/technologyApi';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
	marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function ApplyAsInstructorForm() {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const ApplyFormSchema = Yup.object().shape({
		tag: Yup.string().required('Tag is required'),
		name: Yup.string().required('Name is required'),
		image: Yup.mixed().required('Image is required'),
	});

	const defaultValues = {
		email: '',
		password: '',
		remember: true,
	};

	const methods = useForm({
		resolver: yupResolver(ApplyFormSchema),
		defaultValues,
	});

	const {
		reset,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data) => {
		try {
			await technologyApi.update(data);
			reset();
			enqueueSnackbar('Request sent successfully');
			navigate(PATH_DASHBOARD.technologies.root);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					setValue('image', reader.result);
				};
				reader.onerror = (error) => {
					console.error(error);
				};
			}
		},
		[setValue]
	);

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				<Stack spacing={3}>
					<Card sx={{ p: 3 }}>
						<Stack spacing={3} mt={2}>
							<RHFTextField name="name" label="Technology Name" />
							<RHFTextField name="tag" label="Tag" />
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
