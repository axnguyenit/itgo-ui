import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';

// ----------------------------------------------------------------------

Profile.propTypes = {
	myProfile: PropTypes.object,
	posts: PropTypes.array,
};

export default function Profile({ myProfile, posts }) {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={4}>
				<Stack spacing={3}>
					<ProfileAbout profile={myProfile} />
				</Stack>
			</Grid>
		</Grid>
	);
}
