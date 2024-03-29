import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import technologyApi from '../../../api/technologyApi';
import { PATH_DASHBOARD } from '../../../routes/paths';
import cloudinary from '../../../utils/cloudinary';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
	marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

TechnologyNewForm.propTypes = {
	isEdit: PropTypes.bool,
	currentTechnology: PropTypes.object,
};

export default function TechnologyNewForm({ isEdit, currentTechnology }) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const NewTechnologySchema = Yup.object().shape({
		tag: Yup.string().required('Tag is required'),
		name: Yup.string().required('Name is required'),
		image: Yup.mixed().required('Image is required'),
	});

	const defaultValues = useMemo(
		() => ({
			tag: currentTechnology?.tag || '',
			name: currentTechnology?.name || '',
			image: currentTechnology?.image || null,
		}),
		[currentTechnology]
	);

	const methods = useForm({
		resolver: yupResolver(NewTechnologySchema),
		defaultValues,
	});

	const {
		reset,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	useEffect(() => {
		if (isEdit && currentTechnology) {
			reset(defaultValues);
			setValue('image', cloudinary.w700(currentTechnology?.image));
		}
		if (!isEdit) reset(defaultValues);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, currentTechnology]);

	const onSubmit = async (data) => {
		try {
			if (isEdit) {
				data.id = currentTechnology._id;
				await technologyApi.update(data);
			} else {
				await technologyApi.add(data);
			}
			reset();
			enqueueSnackbar(isEdit ? 'Update success!' : 'Create success!');
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
			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<Card sx={{ p: 3 }}>
						<Stack spacing={3}>
							<LabelStyle>Image</LabelStyle>
							<RHFUploadSingleFile
								name="image"
								accept="image/*"
								maxSize={3145728}
								onDrop={handleDrop}
							/>
						</Stack>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Stack spacing={3}>
						<Card sx={{ p: 3 }}>
							<Stack spacing={3} mt={2}>
								<RHFTextField name="name" label="Technology Name" />
								<RHFTextField name="tag" label="Tag" />
							</Stack>
						</Card>

						<LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
							{!isEdit ? 'Create Technology' : 'Save Changes'}
						</LoadingButton>
					</Stack>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
