import PropTypes from 'prop-types';
// @mui
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
// form
import { Controller, useFormContext } from 'react-hook-form';
import { useRef } from 'react';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

RHFUploadButton.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
};

export default function RHFUploadButton({ name, label, ...other }) {
	const { control } = useFormContext();
	const textFieldEl = useRef(null);

	const handleClick = () => {
		textFieldEl.current?.click();
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Box>
						<FormHelperText error sx={{ mx: 2 }}>
							{error?.message}
						</FormHelperText>

						<Typography variant="subtitle2" noWrap sx={{ width: 100 }}>
							{field.value?.name}
						</Typography>
					</Box>
					<Box>
						<Button
							variant="contained"
							startIcon={<Iconify icon="fa-solid:file-upload" width={20} height={20} />}
							onClick={handleClick}
						>
							{label}
						</Button>
						<TextField
							inputRef={textFieldEl}
							fullWidth
							error={!!error}
							helperText={error?.message}
							type="file"
							sx={{ display: 'none' }}
							{...other}
						/>
					</Box>
				</Stack>
			)}
		/>
	);
}
