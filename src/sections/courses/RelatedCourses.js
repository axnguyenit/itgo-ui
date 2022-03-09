import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Card, CardHeader, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
//
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

RelatedCourses.propTypes = {
	courses: PropTypes.array.isRequired,
};

export default function RelatedCourses({ courses }) {
	return (
		<Card>
			<CardHeader title="Related Courses" />
			<Scrollbar>
				<Stack spacing={3} sx={{ p: 3, pr: 0 }}>
					{courses.length > 0 &&
						courses.map((course) => <CourseItem key={course._id} course={course} />)}
				</Stack>
			</Scrollbar>
		</Card>
	);
}

// ----------------------------------------------------------------------

CourseItem.propTypes = {
	course: PropTypes.shape({
		cover: PropTypes.string,
		name: PropTypes.string,
		price: PropTypes.number,
		priceSale: PropTypes.number,
	}),
};

function CourseItem({ course }) {
	const { name, cover, price, priceSale } = course;
	const hasSale = priceSale > 0;

	return (
		<Stack direction="row" spacing={2}>
			<Image
				alt={name}
				src={cover}
				sx={{ width: 45, height: 45, borderRadius: 1.5, flexShrink: 0 }}
			/>

			<Box sx={{ flexGrow: 1, minWidth: 200 }}>
				<Link component={RouterLink} to="#" sx={{ color: 'text.primary', typography: 'subtitle2' }}>
					<Typography variant="subtitle2" noWrap>
						{name}
					</Typography>
				</Link>

				<Stack direction="row">
					{hasSale && (
						<Typography
							variant="body2"
							sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
						>
							{fCurrency(priceSale)}
						</Typography>
					)}
					&nbsp;
					<Typography variant="body2" sx={{ color: priceSale ? 'error.main' : 'text.secondary' }}>
						{fCurrency(price)}
					</Typography>
				</Stack>
			</Box>
		</Stack>
	);
}
