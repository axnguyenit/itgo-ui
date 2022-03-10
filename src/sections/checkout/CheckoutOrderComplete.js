import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Typography, Stack } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { resetCart } from '../../redux/slices/cart';
// routes
import { PATH_HOME } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { DialogAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
	'& .MuiDialog-paper': {
		margin: 0,
		[theme.breakpoints.up('md')]: {
			maxWidth: 'calc(100% - 48px)',
			maxHeight: 'calc(100% - 48px)',
		},
	},
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ ...other }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleResetStep = () => {
		dispatch(resetCart());
		navigate(PATH_HOME.courses.root);
	};

	return (
		<DialogStyle fullScreen {...other}>
			<Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant="h4" paragraph>
						Thank you for your purchase!
					</Typography>

					<Typography align="left" sx={{ color: 'text.secondary' }}>
						If you have any question or queries then fell to get in contact us. <br /> <br /> All
						the best,
					</Typography>
				</Box>

				<Divider sx={{ my: 3 }} />

				<Stack
					direction={{ xs: 'column-reverse', sm: 'row' }}
					justifyContent="space-between"
					spacing={2}
				>
					<Button
						color="inherit"
						onClick={handleResetStep}
						startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
					>
						Continue
					</Button>
				</Stack>
			</Box>
		</DialogStyle>
	);
}
