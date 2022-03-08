import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack } from '@mui/material';
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

export default function Courses() {
	const [courses, setCourses] = useState([]);
	const [page, setPage] = useState(1);

	const getAllCourses = async () => {
		const params = {
			_page: page,
			_limit: 3,
		};
		try {
			const response = await courseApi.getAll(params);
			if (response.data.success) setCourses(response.data.courses);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllCourses();
	}, [page]);

	return (
		<Page title="Courses">
			<RootStyle>
				<CourseHero />
				<Container maxWidth={'lg'} sx={{ mt: 15, mb: 10 }}>
					<Stack
						spacing={2}
						direction={{ xs: 'column', sm: 'row' }}
						alignItems={{ sm: 'center' }}
						justifyContent="space-between"
						sx={{ mb: 2 }}
					>
						<CoursesSearch />
					</Stack>

					<CourseList courses={courses} loading={!courses.length} />
				</Container>
			</RootStyle>
		</Page>
	);
}
