import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../components/skeleton';
//
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

CourseList.propTypes = {
	courses: PropTypes.array.isRequired,
	loading: PropTypes.bool,
};

export default function CourseList({ courses, loading }) {
	return (
		<Box
			sx={{
				display: 'grid',
				gap: 3,
				gridTemplateColumns: {
					xs: 'repeat(1, 1fr)',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(3, 1fr)',
					lg: 'repeat(4, 1fr)',
				},
			}}
		>
			{(loading ? [...Array(12)] : courses).map((course, index) =>
				course ? (
					<CourseCard key={course._id} course={course} />
				) : (
					<SkeletonProductItem key={index} />
				)
			)}
		</Box>
	);
}
