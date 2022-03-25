import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import courseApi from '../../../api/courseApi';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';
import userApi from '../../../api/userApi';
import cloudinary from '../../../utils/cloudinary';

// ----------------------------------------------------------------------

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
	currentCourse: PropTypes.object,
};

export default function CourseNewForm({ isEdit, currentCourse }) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [instructorList, setInstructorList] = useState([]);

	const NewCourseSchema = Yup.object().shape({
		instructor: Yup.string().required('Instructor is required'),
		name: Yup.string().required('Name is required'),
		cover: Yup.mixed().required('Cover is required'),
		price: Yup.number()
			.integer('Price must be a integer')
			.moreThan(1000, 'Price must be more than 1000'),
		priceSale: Yup.number()
			.integer('Price sale must be a integer')
			.test('priceSale', 'Price sale must be more than 1000', (priceSale) => {
				if (priceSale === 0) return true;
				if (priceSale && priceSale > 1000) return true;
				return false;
			})
			.lessThan(Yup.ref('price'), 'Price sale must be less than price and more than 1000'),
		minStudent: Yup.number()
			.integer('Minimum student must be a integer')
			.moreThan(4, 'Minimum student must be at least 5'),
		overview: Yup.string()
			.required('Overview is required')
			.min(50, 'Overview must be at least 50 characters'),
		requirements: Yup.string()
			.required('Requirements is required')
			.min(50, 'Requirements must be at least 50 characters'),
		targetAudiences: Yup.string()
			.required('Target Audiences is required')
			.min(50, 'Target Audiences must be at least 50 characters'),
	});

	const defaultValues = useMemo(
		() => ({
			instructor: currentCourse?.instructor?._id || '',
			name: currentCourse?.name || '',
			cover: currentCourse?.cover || null,
			price: currentCourse?.price || 0,
			priceSale: currentCourse?.priceSale || 0,
			minStudent: currentCourse?.minStudent || 5,
			tags: currentCourse?.tags || [TAGS_OPTION[0]],
			overview: currentCourse?.details.overview || '',
			requirements: currentCourse?.details.requirements || '',
			targetAudiences: currentCourse?.details.targetAudiences || '',
		}),
		[currentCourse]
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

	const getAllInstructors = async () => {
		try {
			const response = await userApi.getAllInstructors({});
			setInstructorList(response.data.instructors);
			if (!isEdit) setValue('instructor', response.data.instructors[0]?._id);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllInstructors();
		if (isEdit && currentCourse) {
			reset(defaultValues);
			setValue('cover', cloudinary.w700(currentCourse?.cover));
			setValue('instructor', currentCourse?.instructor._id);
		}
		if (!isEdit) reset(defaultValues);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, currentCourse]);

	const onSubmit = async (data) => {
		try {
			if (isEdit) {
				data.id = currentCourse._id;
				await courseApi.update(data);
			} else {
				await courseApi.add(data);
			}
			reset();
			enqueueSnackbar(isEdit ? 'Update success!' : 'Create success!');
			navigate(PATH_DASHBOARD.courses.root);
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
					setValue('cover', reader.result);
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
							</div>
						</Stack>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Stack spacing={3}>
						<Card sx={{ p: 3 }}>
							<Stack spacing={3} mt={2}>
								<RHFSelect name="instructor" label="Instructor" InputLabelProps={{ shrink: true }}>
									{!!instructorList.length &&
										instructorList.map((instructor) => (
											<option key={instructor?._id} value={instructor?._id}>
												{instructor?.email}
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

								<RHFTextField
									name="minStudent"
									label="Minimum student"
									placeholder="0.00"
									defaultValue={getValues('minStudent') === 0 ? '' : getValues('minStudent')}
									onChange={(event) => setValue('minStudent', Number(event.target.value))}
									InputLabelProps={{ shrink: true }}
									InputProps={{ type: 'number' }}
								/>

								<RHFTextField
									name="price"
									label="Regular Price"
									placeholder="0.00"
									defaultValue={getValues('price') === 0 ? '' : getValues('price')}
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
									defaultValue={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
									onChange={(event) => setValue('priceSale', Number(event.target.value))}
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
