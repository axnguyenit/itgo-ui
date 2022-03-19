import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, Rating } from '@mui/material';
// routes
import { PATH_HOME } from '../../routes/paths';
import Image from '../../components/Image';

// ----------------------------------------------------------------------

CourseCard.propTypes = {
	order: PropTypes.object.isRequired,
};

export default function CourseCard({ order }) {
	const { _id, course } = order;

	const linkTo = `${PATH_HOME.courses.root}/${_id}`;

	return (
		<Card>
			<Box sx={{ position: 'relative' }}>
				<Image alt={course?.name} src={course?.cover} ratio="16/9" />
			</Box>

			<Stack spacing={2} sx={{ p: 2 }}>
				<Box sx={{ flexGrow: 1, minWidth: 0 }}>
					<Link to={linkTo} color="inherit" component={RouterLink}>
						<Typography variant="subtitle2" noWrap>
							{course?.name}
						</Typography>
					</Link>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
							{course?.instructor?.firstName} {course?.instructor?.lastName}
						</Typography>
					</Box>
				</Box>

				<Stack direction="row" alignItems="flex-end" justifyContent="space-between">
					<Rating value={4.5} size="small" precision={0.1} readOnly />
				</Stack>
			</Stack>
		</Card>
	);
}
