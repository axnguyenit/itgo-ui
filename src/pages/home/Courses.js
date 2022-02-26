import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// components
import Page from '../../components/Page';
// sections
import { CourseList, CoursesSearch, CourseHero } from '../../sections/courses';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

export default function Courses() {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

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

					<CourseList products={products} loading={!products.length} />
				</Container>
			</RootStyle>
		</Page>
	);
}
