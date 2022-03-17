import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
	MenuItem,
	IconButton,
	DialogTitle,
	Stack,
	Typography,
	Divider,
	DialogActions,
	Button,
} from '@mui/material';
// routes
import { PATH_INSTRUCTOR } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { DialogAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

CourseMoreMenu.propTypes = {
	onDelete: PropTypes.func,
	courseId: PropTypes.string.isRequired,
	courseName: PropTypes.string.isRequired,
};

export default function CourseMoreMenu({ onDelete, courseId, courseName }) {
	const [open, setOpen] = useState(null);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	const ICON = {
		mr: 2,
		width: 20,
		height: 20,
	};

	const handleDelete = () => {
		onDelete();
		setIsOpenModal(false);
	};

	return (
		<>
			<IconButton onClick={handleOpen}>
				<Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
			</IconButton>

			<MenuPopover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				arrow="right-top"
				sx={{
					mt: -1,
					width: 160,
					'& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
				}}
			>
				<MenuItem onClick={() => setIsOpenModal(true)} sx={{ color: 'error.main' }}>
					<Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
					Delete
				</MenuItem>

				<MenuItem component={RouterLink} to={`${PATH_INSTRUCTOR.courses.root}/${courseId}/edit`}>
					<Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
					Edit
				</MenuItem>
			</MenuPopover>

			<DialogAnimate open={isOpenModal} onClose={() => setIsOpenModal(false)}>
				<DialogTitle>Delete course</DialogTitle>
				<Divider sx={{ borderStyle: 'dashed', mt: 2 }} />
				<Stack spacing={3} sx={{ px: 3, py: 2 }}>
					<Typography>
						Are you sure to want to permanently delete this course ({`${courseName}`})?
					</Typography>
				</Stack>

				<DialogActions>
					<Button variant="outlined" color="inherit" onClick={() => setIsOpenModal(false)}>
						Cancel
					</Button>

					<Button onClick={handleDelete} variant="contained" color="error">
						Delete
					</Button>
				</DialogActions>
			</DialogAnimate>
		</>
	);
}
