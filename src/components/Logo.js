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
				src="https://firebasestorage.googleapis.com/v0/b/project-react-native-fafe7.appspot.com/o/logo%2Flogo-itgo.png?alt=media&token=32684729-1bdd-4f0a-8bb5-67f1ac9c362c"
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
