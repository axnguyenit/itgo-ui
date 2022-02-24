import React from 'react';
import PropTypes from 'prop-types';
// utils
import { fDate } from '../../utils/formatTime';
// @mui
import { Stack, Paper, Avatar, Typography, Divider } from '@mui/material';

// ----------------------------------------------------------------------

FaqsResponse.propTypes = {
	comments: PropTypes.array,
};

export default function FaqsResponse({ comments }) {
	return (
		<Stack spacing={1.5}>
			<Divider />
			{comments.map((comment) => (
				<Stack key={comment.id} direction="row" spacing={2} sx={{ pl: 5 }}>
					<Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
					<Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
						<Stack
							direction={{ xs: 'column', sm: 'row' }}
							alignItems={{ sm: 'center' }}
							justifyContent="space-between"
							sx={{ mb: 0.5 }}
						>
							<Typography variant="subtitle2">{comment.author.name}</Typography>
							<Typography variant="caption" sx={{ color: 'text.disabled' }}>
								{fDate(comment.createdAt)}
							</Typography>
						</Stack>
						<Typography variant="body2" sx={{ color: 'text.secondary' }}>
							{comment.message}
						</Typography>
					</Paper>
				</Stack>
			))}
		</Stack>
	);
}
