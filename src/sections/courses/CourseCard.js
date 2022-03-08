import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, Rating } from '@mui/material';
// routes
import { PATH_HOME } from '../../routes/paths';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Label from '../../components/Label';
import Image from '../../components/Image';

// ----------------------------------------------------------------------

CourseCard.propTypes = {
	course: PropTypes.object,
};

export default function CourseCard({ course }) {
	const {
		_id,
		name,
		cover,
		price,
		status,
		priceSale,
		instructor: { firstName, lastName },
	} = course;

	const linkTo = `${PATH_HOME.courses.root}/${_id}`;

	return (
		<Card>
			<Box sx={{ position: 'relative' }}>
				{status !== 'default' && (
					<Label
						variant="filled"
						color={(status === 'sale' && 'error') || 'info'}
						sx={{
							top: 16,
							right: 16,
							zIndex: 9,
							position: 'absolute',
							textTransform: 'uppercase',
						}}
					>
						{status}
					</Label>
				)}
				<Image alt={name} src={cover} ratio="16/9" />
			</Box>

			<Stack spacing={2} sx={{ p: 2 }}>
				<Box sx={{ flexGrow: 1, minWidth: 0 }}>
					<Link to={linkTo} color="inherit" component={RouterLink}>
						<Typography variant="subtitle2" noWrap>
							{name}
						</Typography>
					</Link>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
							{firstName} {lastName}
						</Typography>
					</Box>
				</Box>

				<Stack direction="row" alignItems="flex-end" justifyContent="space-between">
					<Rating value={4.5} size="small" precision={0.1} readOnly />

					<Stack direction="row" alignItems="flex-end" spacing={0.5}>
						{!!priceSale && (
							<Typography
								variant="body2"
								sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
							>
								{fCurrency(price)}
							</Typography>
						)}
						<Typography variant="subtitle1">{fCurrency(priceSale || price)}</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
}
