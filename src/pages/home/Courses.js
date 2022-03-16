import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Pagination } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { CourseList, CoursesSearch, CourseHero } from '../../sections/courses';
// api
import courseApi from '../../api/courseApi';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

const LIMIT_COURSE = 12;

export default function Courses() {
	const [courses, setCourses] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState(1);

	useEffect(() => {
		const getAllCourses = async () => {
			const params = {
				_page: page,
				_limit: LIMIT_COURSE,
			};
			try {
				const response = await courseApi.getAll(params);
				if (response.data.success) {
					setCourses(response.data.courses);
					setPagination(response.data.pagination);
				}
			} catch (error) {
				console.error(error);
			}
		};

		getAllCourses();
	}, [page]);

	return (
		<Page title="Courses">
			<RootStyle>
				<CourseHero label="Courses" />
				<Container maxWidth={'lg'} sx={{ mt: 15, mb: 10 }}>
					{/* <Stack
						spacing={2}
						direction={{ xs: 'column', sm: 'row' }}
						alignItems={{ sm: 'center' }}
						justifyContent="space-between"
						sx={{ mb: 2 }}
					>
						<CoursesSearch />
					</Stack> */}

					<CourseList courses={courses} loading={!courses.length} />

					<Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 3 }}>
						<Pagination
							count={Math.ceil(pagination._totalRows / LIMIT_COURSE)}
							// page={pageItem}
							onChange={(event, value) => setPage(value)}
							color="primary"
							variant="outlined"
							shape="rounded"
						/>
					</Stack>
				</Container>
			</RootStyle>
		</Page>
	);
}
