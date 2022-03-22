import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Button, DialogActions, Typography } from '@mui/material';
// utils

import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

CalendarEvent.propTypes = {
	event: PropTypes.object,
	onCancel: PropTypes.func,
};

export default function CalendarEvent({ event, onCancel }) {
	return (
		<>
			<Stack spacing={3} sx={{ p: 3 }}>
				<Box>
					<Typography variant="h6" sx={{ color: 'text.disabled' }}>
						Title
					</Typography>
					<Typography variant="body2">{event?.title}</Typography>
				</Box>

				<Box>
					<Typography variant="h6" sx={{ color: 'text.disabled' }}>
						Description
					</Typography>
					<Typography variant="body2">{event?.description}</Typography>
				</Box>

				<Box>
					<Typography variant="h6" sx={{ color: 'text.disabled' }}>
						Start
					</Typography>
					<Typography variant="body2">{fDateTime(event?.start)}</Typography>
				</Box>

				<Box>
					<Typography variant="h6" sx={{ color: 'text.disabled' }}>
						End
					</Typography>
					<Typography variant="body2">{fDateTime(event?.end)}</Typography>
				</Box>
			</Stack>

			<DialogActions>
				<Box sx={{ flexGrow: 1 }} />
				<Button variant="outlined" color="inherit" onClick={onCancel}>
					Cancel
				</Button>

				<Button variant="contained">Join meeting</Button>
			</DialogActions>
		</>
	);
}
