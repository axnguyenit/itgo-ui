import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
	Box,
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	Typography,
	IconButton,
	TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: theme.spacing(0.5),
	padding: theme.spacing(0.5, 0.75),
	borderRadius: theme.shape.borderRadius,
	border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

CheckoutCourseList.propTypes = {
	courses: PropTypes.array.isRequired,
	onDelete: PropTypes.func,
};

export default function CheckoutCourseList({ courses, onDelete }) {
	return (
		<TableContainer sx={{ minWidth: 720 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Course</TableCell>
						<TableCell align="right">Total Price</TableCell>
						<TableCell align="right" />
					</TableRow>
				</TableHead>

				<TableBody>
					{courses.length > 0 &&
						courses.map((item) => {
							const { _id, name, price, priceSale, cover } = item?.course;
							return (
								<TableRow key={_id}>
									<TableCell>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Image
												alt="course image"
												src={cover}
												sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
											/>
											<Box>
												<Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
													{name}
												</Typography>
											</Box>
										</Box>
									</TableCell>

									<TableCell align="right">
										{priceSale ? fCurrency(priceSale) : fCurrency(price)}
									</TableCell>

									<TableCell align="right">
										<IconButton onClick={() => onDelete(item?._id)}>
											<Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
	available: PropTypes.number,
	quantity: PropTypes.number,
	onIncrease: PropTypes.func,
	onDecrease: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
	return (
		<Box sx={{ width: 96, textAlign: 'right' }}>
			<IncrementerStyle>
				<IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
					<Iconify icon={'eva:minus-fill'} width={16} height={16} />
				</IconButton>
				{quantity}
				<IconButton
					size="small"
					color="inherit"
					onClick={onIncrease}
					disabled={quantity >= available}
				>
					<Iconify icon={'eva:plus-fill'} width={16} height={16} />
				</IconButton>
			</IncrementerStyle>
			<Typography variant="caption" sx={{ color: 'text.secondary' }}>
				available: {available}
			</Typography>
		</Box>
	);
}
