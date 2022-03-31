import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import {
	Stack,
	Container,
	Pagination,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { CourseList, CourseHero } from '../../sections/courses';
// api
import courseApi from '../../api/courseApi';
import EmptyContent from '../../components/EmptyContent';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

const LIMIT_COURSE = 8;

const TAGS_OPTION = [
	'All',
	'JavaScript',
	'TypeScript',
	'HTML, CSS',
	'NodeJS',
	'NestJS',
	'ExpressJS',
	'Python',
	'ReactJS',
	'NextJS',
	'Front End',
	'Back End',
	'Kotlin',
	'Java',
	'Android',
	'C',
	'C++',
	'.NET',
	'PHP',
	'Laravel',
	'Angular',
];

export default function Courses() {
	const [courses, setCourses] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState(1);
	const [category, setCategory] = useState('All');
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const _category = searchParams.get('category');
		const _page = searchParams.get('page');
		setPage(Number(_page) || 1);

		if (_category) {
			const newCategory = TAGS_OPTION.find((option) =>
				option.toLocaleLowerCase().includes(_category.toLocaleLowerCase())
			);
			setCategory(newCategory);
		}

		const getAllCourses = async () => {
			setIsLoading(true);
			const params = {
				_page: Number(_page) || 1,
				_limit: LIMIT_COURSE,
				_tags: _category && _category !== 'All' ? _category : '',
			};

			try {
				const response = await courseApi.getAll(params);
				setCourses(response.data.courses);
				setPagination(response.data.pagination);
			} catch (error) {
				console.error(error);
			}
			setIsLoading(false);
		};

		getAllCourses();
	}, [searchParams]);

	const handleChangeCategory = (event) => {
		const { value } = event.target;
		setCategory(value);
		setSearchParams({ ...Object.fromEntries([...searchParams]), category: value });
	};

	const handleChangePage = (value) => {
		setPage(value);
		setSearchParams({ ...Object.fromEntries([...searchParams]), page: value });
	};

	return (
		<Page title="Courses">
			<RootStyle>
				<CourseHero
					label="Courses"
					src={`${window.location.origin}/assets/images/courses-hero.jpg`}
				/>
				<Container maxWidth={'lg'} sx={{ mt: 15, mb: 10 }}>
					<Stack
						spacing={2}
						direction="row"
						alignItems="center"
						justifyContent="flex-end"
						sx={{ mb: 4 }}
					>
						<FormControl sx={{ width: { xs: '50%', md: '25%' } }}>
							<InputLabel size="small">Category</InputLabel>
							<Select
								size="small"
								value={category}
								label="Category"
								onChange={handleChangeCategory}
							>
								{TAGS_OPTION.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>

					<CourseList courses={courses} loading={isLoading} />

					{!courses.length && <EmptyContent title="No matching courses" />}
					{pagination._totalRows > LIMIT_COURSE && (
						<Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 3 }}>
							<Pagination
								count={Math.ceil(pagination._totalRows / LIMIT_COURSE)}
								defaultPage={page}
								onChange={(event, value) => handleChangePage(value)}
								color="primary"
								variant="outlined"
								shape="rounded"
							/>
						</Stack>
					)}
				</Container>
			</RootStyle>
		</Page>
	);
}
