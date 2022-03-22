import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CourseNewForm from '../../sections/@dashboard/courses/CourseNewForm';
import courseApi from '../../api/courseApi';

// ----------------------------------------------------------------------

export default function CourseCreate() {
	const [course, setCourse] = useState(null);
	const { pathname } = useLocation();
	const { id } = useParams();
	const isEdit = pathname.includes('edit');
	const navigate = useNavigate();

	useEffect(() => {
		const getCourse = async () => {
			if (!isEdit) return;
			try {
				const response = await courseApi.get(id);
				setCourse(response.data.course);
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
		};

		isEdit ? getCourse() : setCourse(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, id]);

	return (
		<Page title={!isEdit ? 'Create a new course' : 'Edit course'}>
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading={!isEdit ? 'Create a new course' : 'Edit course'}
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{
							name: 'Courses',
							href: PATH_DASHBOARD.courses.root,
						},
						{ name: !isEdit ? 'New course' : 'Edit course' },
					]}
				/>
				{(course || !isEdit) && <CourseNewForm isEdit={isEdit} currentCourse={course} />}
			</Container>
		</Page>
	);
}
