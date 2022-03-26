import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Avatar } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
	disabledLink: PropTypes.bool,
	sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
	const logo = (
		<Stack sx={{ width: 45, height: 45, ...sx }}>
			<Avatar
				src="/assets/images/logo.png"
				sx={{ width: 'inherit', height: 'inherit' }}
				alt="ITGO"
			/>
		</Stack>
	);

	if (disabledLink) {
		return <>{logo}</>;
	}

	return <RouterLink to="/">{logo}</RouterLink>;
}
