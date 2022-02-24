import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
	Link,
	Card,
	Stack,
	TextField,
	Typography,
	CardHeader,
	IconButton,
	InputAdornment,
} from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// utils
import { fDate } from '../../utils/formatTime';
// components
// import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import MyAvatar from '../../components/MyAvatar';
import FaqsResponse from './FaqsResponse';

// ----------------------------------------------------------------------

FaqsCard.propTypes = {
	post: PropTypes.object,
};

export default function FaqsCard({ post }) {
	const { user } = useAuth();

	const commentInputRef = useRef(null);

	const fileInputRef = useRef(null);

	const [message, setMessage] = useState('');
	const [visibleRes, setVisibleRes] = useState(false);

	const hasComments = post.comments.length > 0;

	const handleChangeMessage = (value) => {
		setMessage(value);
	};

	const handleClickAttach = () => {
		fileInputRef.current?.click();
	};

	const handleClickComment = () => {
		commentInputRef.current?.focus();
		setVisibleRes(!visibleRes);
	};

	return (
		<Card>
			<CardHeader
				disableTypography
				avatar={<MyAvatar />}
				title={
					<Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
						{user?.displayName}
					</Link>
				}
				subheader={
					<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
						{fDate(post.createdAt)}
					</Typography>
				}
				action={
					<IconButton onClick={handleClickComment}>
						<Iconify icon={'eva:message-square-fill'} width={20} height={20} />
					</IconButton>
				}
			/>

			<Stack spacing={3} sx={{ p: 3 }}>
				<Typography>{post.message}</Typography>

				{/* <Image alt="post media" src={post.media} ratio="16/9" sx={{ borderRadius: 1 }} /> */}

				{hasComments && visibleRes && <FaqsResponse comments={post.comments} />}

				{visibleRes && (
					<Stack direction="row" alignItems="center">
						<MyAvatar />
						<TextField
							fullWidth
							size="small"
							value={message}
							inputRef={commentInputRef}
							placeholder="Write your response..."
							onChange={(event) => handleChangeMessage(event.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton size="small" onClick={handleClickAttach}>
											<Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								ml: 2,
								mr: 1,
								'& fieldset': {
									borderWidth: `1px !important`,
									borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
								},
							}}
						/>
						<IconButton>
							<Iconify icon={'ic:round-send'} width={24} height={24} />
						</IconButton>
						<input type="file" ref={fileInputRef} style={{ display: 'none' }} />
					</Stack>
				)}
			</Stack>
		</Card>
	);
}
