import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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

	useEffect(() => {
		const getCourse = async () => {
			if (!isEdit) return;
			try {
				const response = await courseApi.get(id);
				if (response.data.success) setCourse(response.data.course);
			} catch (error) {
				console.error(error);
			}
		};

		isEdit ? getCourse() : setCourse(null);
	}, [isEdit, id]);

	return (
		<Page title="Create a new course">
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
