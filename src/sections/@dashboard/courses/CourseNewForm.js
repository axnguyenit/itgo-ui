import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { camelCase } from 'change-case';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
	Card,
	Chip,
	Grid,
	Stack,
	TextField,
	Typography,
	Autocomplete,
	InputAdornment,
} from '@mui/material';
// components
import {
	FormProvider,
	RHFSelect,
	RHFEditor,
	RHFTextField,
	RHFUploadSingleFile,
} from '../../../components/hook-form';
import axios from 'axios';
import courseApi from 'src/api/courseApi';

// ----------------------------------------------------------------------

const STATUS_OPTION = ['Default', 'Sale', 'New'];

const INSTRUCTOR_OPTION = [
	{
		_id: '621ef50a265a5b324c1dec77',
		email: 'hothihuongsen21042001@gmail.com',
	},
	{
		_id: '621ef50a265a5b324c1dec77',
		email: 'jojomi1234@gmail.com',
	},
	{
		_id: '621ef50a265a5b324c1dec77',
		email: 'thuy.nguyen22@student.passerellesnumeriques.org',
	},
	{
		_id: '621ef50a265a5b324c1dec77',
		email: 'manh.nguyen22@student.passerellesnumeriques.org',
	},
	{
		_id: '621ef50a265a5b324c1dec77',
		email: 'kha.nguyen01.it@gmail.com',
	},
];

const TAGS_OPTION = [
	'JavaScript',
	'TypeScript',
	'HTML, CSS',
	'NodeJS',
	'ExpressJS',
	'Python',
	'ReactJS',
	'Front End',
	'Back End',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
	marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

CourseNewForm.propTypes = {
	isEdit: PropTypes.bool,
	currentProduct: PropTypes.object,
};

export default function CourseNewForm({ isEdit, currentProduct }) {
	const { enqueueSnackbar } = useSnackbar();

	const NewCourseSchema = Yup.object().shape({
		instructor: Yup.string().required('Instructor is required'),
		name: Yup.string().required('Name is required'),
		cover: Yup.mixed().required('Cover is required'),
		price: Yup.number().moreThan(0, 'Price should not be $0.00'),
		overview: Yup.string().required('Overview is required'),
		requirements: Yup.string().required('Requirements is required'),
		targetAudiences: Yup.string().required('Target Audiences is required'),
	});

	const defaultValues = useMemo(
		() => ({
			instructor: currentProduct?.name || INSTRUCTOR_OPTION[0]._id,
			name: currentProduct?.name || '',
			cover: currentProduct?.cover || null,
			price: currentProduct?.price || 0,
			priceSale: currentProduct?.priceSale || 0,
			status: currentProduct?.status || camelCase(STATUS_OPTION[0]),
			tags: currentProduct?.tags || [TAGS_OPTION[0]],
			overview: currentProduct?.overview || '',
			requirements: currentProduct?.requirements || '',
			targetAudiences: currentProduct?.targetAudiences || '',
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentProduct]
	);

	const methods = useForm({
		resolver: yupResolver(NewCourseSchema),
		defaultValues,
	});

	const {
		reset,
		control,
		setValue,
		getValues,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	useEffect(() => {
		if (isEdit && currentProduct) {
			reset(defaultValues);
		}
		if (!isEdit) {
			reset(defaultValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, currentProduct]);

	const onSubmit = async (data) => {
		try {
			data.cover = data.cover.path;
			const res = await courseApi.add(data);
			if (res.success) {
				reset();
				enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				const data = new FormData();
				data.append('image', file);

				axios
					.post('http://127.0.0.1:8000/api/upload', data, {
						headers: {
							'x-auth-token':
								'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjFmMDdjMTNlYmMzM2FjNDE0MDMzOTgiLCJmaXJzdE5hbWUiOiJLaGEiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoia2hhLml0QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzSW5zdHJ1Y3RvciI6ZmFsc2UsImlhdCI6MTY0NjQ3NzY1NiwiZXhwIjoxNjQ2NDgxMjU2fQ.OZJr17g75dGIyD1DwtpMxvsX7TVi1jWCdZtrippeop8',
						},
					})
					.then((res) => {
						console.log(res);
						const path = res.data.file.path;
						const cover = { path, preview: URL.createObjectURL(file) };
						setValue('cover', cover);
					})
					.catch((err) => console.log(err));
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
							<RHFTextField name="name" label="Course Name" />

							<div>
								<LabelStyle>Overview</LabelStyle>
								<RHFEditor simple name="overview" />
							</div>
							<div>
								<LabelStyle>Requirements</LabelStyle>
								<RHFEditor simple name="requirements" />
							</div>
							<div>
								<LabelStyle>Target Audiences</LabelStyle>
								<RHFEditor simple name="targetAudiences" />
							</div>

							<div>
								<LabelStyle>Cover</LabelStyle>
								<RHFUploadSingleFile
									name="cover"
									accept="image/*"
									maxSize={3145728}
									onDrop={handleDrop}
								/>
								{/* <RHFUploadMultiFile
									name="images"
									showPreview
									accept="image/*"
									maxSize={3145728}
									onDrop={handleDrop}
									onRemove={handleRemove}
									onRemoveAll={handleRemoveAll}
								/> */}
							</div>
						</Stack>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Stack spacing={3}>
						<Card sx={{ p: 3 }}>
							<Stack spacing={3} mt={2}>
								<RHFSelect name="instructor" label="Instructor">
									{INSTRUCTOR_OPTION.map((instructor) => (
										<option key={instructor._id} value={instructor._id}>
											{instructor.email}
										</option>
									))}
								</RHFSelect>

								<RHFSelect name="status" label="Status">
									{STATUS_OPTION.map((status) => (
										<option key={status} value={camelCase(status)}>
											{status}
										</option>
									))}
								</RHFSelect>

								<Controller
									name="tags"
									control={control}
									render={({ field }) => (
										<Autocomplete
											{...field}
											multiple
											freeSolo
											onChange={(event, newValue) => field.onChange(newValue)}
											options={TAGS_OPTION.map((option) => option)}
											renderTags={(value, getTagProps) =>
												value.map((option, index) => (
													<Chip
														{...getTagProps({ index })}
														key={option}
														size="small"
														label={option}
													/>
												))
											}
											renderInput={(params) => <TextField label="Tags" {...params} />}
										/>
									)}
								/>
							</Stack>
						</Card>

						<Card sx={{ p: 3 }}>
							<Stack spacing={3} mb={2}>
								<RHFTextField
									name="price"
									label="Regular Price"
									placeholder="0.00"
									value={getValues('price') === 0 ? '' : getValues('price')}
									onChange={(event) => setValue('price', Number(event.target.value))}
									InputLabelProps={{ shrink: true }}
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>,
										type: 'number',
									}}
								/>

								<RHFTextField
									name="priceSale"
									label="Sale Price"
									placeholder="0.00"
									value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
									onChange={(event) => setValue('price', Number(event.target.value))}
									InputLabelProps={{ shrink: true }}
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>,
										type: 'number',
									}}
								/>
							</Stack>
						</Card>

						<LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
							{!isEdit ? 'Create Course' : 'Save Changes'}
						</LoadingButton>
					</Stack>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
