import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CourseNewForm from '../../sections/@dashboard/courses/CourseNewForm';

// ----------------------------------------------------------------------

export default function CourseCreate() {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { name } = useParams();
	const { products } = useSelector((state) => state.product);
	const isEdit = pathname.includes('edit');
	const currentProduct = products.find((product) => paramCase(product.name) === name);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

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
						{ name: !isEdit ? 'New course' : name },
					]}
				/>

				<CourseNewForm isEdit={isEdit} currentProduct={currentProduct} />
			</Container>
		</Page>
	);
}
