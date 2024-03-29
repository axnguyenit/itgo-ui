import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
	MenuItem,
	IconButton,
	DialogTitle,
	Divider,
	DialogActions,
	Button,
	Stack,
	Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { DialogAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

ApplicationMoreMenu.propTypes = {
	applicationId: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onDeny: PropTypes.func,
	onApprove: PropTypes.func,
};

export default function ApplicationMoreMenu({ applicationId, name, onDeny, onApprove }) {
	const [open, setOpen] = useState(null);
	const [isOpenModalDeny, setIsOpenModalDeny] = useState(false);
	const [isOpenModalApprove, setIsOpenModalApprove] = useState(false);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	const handleDelete = () => {
		onDeny();
		setIsOpenModalDeny(false);
	};

	const handleApprove = () => {
		onApprove();
		setIsOpenModalDeny(false);
	};

	const ICON = {
		mr: 2,
		width: 20,
		height: 20,
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
				<MenuItem onClick={() => setIsOpenModalApprove(true)} sx={{ color: 'success.main' }}>
					<Iconify icon="icon-park-outline:doc-success" sx={{ ...ICON }} />
					Approve
				</MenuItem>
				<MenuItem
					component={RouterLink}
					to={`${PATH_DASHBOARD.applications.root}/${applicationId}/cv`}
					sx={{ color: 'info.main' }}
				>
					<Iconify icon="fluent:document-pdf-20-regular" sx={{ ...ICON }} />
					View CV
				</MenuItem>
				<MenuItem onClick={() => setIsOpenModalDeny(true)} sx={{ color: 'error.main' }}>
					<Iconify icon="eva:close-circle-outline" sx={{ ...ICON }} />
					Deny
				</MenuItem>
			</MenuPopover>

			<DialogAnimate open={isOpenModalDeny} onClose={() => setIsOpenModalDeny(false)}>
				<DialogTitle>Approve user</DialogTitle>
				<Divider sx={{ borderStyle: 'dashed', mt: 2 }} />

				<Stack spacing={3} sx={{ px: 3, py: 2 }}>
					<Typography>
						Are you sure to want to deny permission for this user&nbsp;
						<strong>{`${name}`}</strong>?
					</Typography>
				</Stack>

				<DialogActions>
					<Button variant="outlined" color="inherit" onClick={() => setIsOpenModalDeny(false)}>
						Cancel
					</Button>

					<Button onClick={handleDelete} variant="contained" color="error">
						Deny
					</Button>
				</DialogActions>
			</DialogAnimate>

			<DialogAnimate open={isOpenModalApprove} onClose={() => setIsOpenModalApprove(false)}>
				<DialogTitle>Approve user</DialogTitle>
				<Divider sx={{ borderStyle: 'dashed', mt: 2 }} />

				<Stack spacing={3} sx={{ px: 3, py: 2 }}>
					<Typography>
						Are you sure to want to grant permission to this user&nbsp;
						<strong>{`${name}`}</strong>?
					</Typography>
				</Stack>

				<DialogActions>
					<Button variant="outlined" color="inherit" onClick={() => setIsOpenModalApprove(false)}>
						Cancel
					</Button>

					<Button onClick={handleApprove} variant="contained" color="success">
						Approve
					</Button>
				</DialogActions>
			</DialogAnimate>
		</>
	);
}
