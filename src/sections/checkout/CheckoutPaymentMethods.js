import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {
	Box,
	Card,
	Radio,
	Stack,
	Typography,
	RadioGroup,
	CardHeader,
	CardContent,
	FormHelperText,
	FormControlLabel,
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 2.5),
	justifyContent: 'space-between',
	transition: theme.transitions.create('all'),
	border: `solid 1px ${theme.palette.divider}`,
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
	paymentOptions: PropTypes.array,
};

export default function CheckoutPaymentMethods({ paymentOptions }) {
	const { control } = useFormContext();

	const isDesktop = useResponsive('up', 'sm');

	return (
		<Card sx={{ my: 3 }}>
			<CardHeader title="Payment options" />
			<CardContent>
				<Controller
					name="payment"
					control={control}
					render={({ field, fieldState: { error } }) => (
						<>
							<RadioGroup row {...field}>
								<Stack spacing={2} sx={{ width: '100%' }}>
									{paymentOptions.map((method) => {
										const { value, title, icons, description } = method;

										const selected = field.value === value;

										return (
											<OptionStyle
												key={title}
												sx={{
													...(selected && {
														boxShadow: (theme) => theme.customShadows.z20,
													}),
												}}
											>
												<FormControlLabel
													value={value}
													control={
														<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />
													}
													label={
														<Box sx={{ ml: 1 }}>
															<Typography variant="subtitle2">{title}</Typography>
															<Typography variant="body2" sx={{ color: 'text.secondary' }}>
																{description}
															</Typography>
														</Box>
													}
													sx={{ flexGrow: 1, py: 3 }}
												/>

												<Box sx={{ flexGrow: 1 }} />

												{isDesktop && (
													<Stack direction="row" spacing={1} flexShrink={0}>
														{icons.map((icon) => (
															<Image key={icon} alt="logo card" src={icon} sx={{ height: 28 }} />
														))}
													</Stack>
												)}
											</OptionStyle>
										);
									})}
								</Stack>
							</RadioGroup>

							{!!error && (
								<FormHelperText error sx={{ pt: 1, px: 2 }}>
									{error.message}
								</FormHelperText>
							)}
						</>
					)}
				/>
			</CardContent>
		</Card>
	);
}
