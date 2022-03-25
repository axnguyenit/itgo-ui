import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Image from '../../../components/Image';
import cloudinary from '../../../utils/cloudinary';

// ----------------------------------------------------------------------

const Input = styled('input')({
	display: 'none',
});

// ----------------------------------------------------------------------

UploadButton.propTypes = {
	onChange: PropTypes.func,
	required: PropTypes.bool,
	value: PropTypes.string,
};

export default function UploadButton({ onChange, required, value }) {
	const selectFileEl = useRef(null);
	const [preview, setPreview] = useState(null);

	const handleSelectFile = () => {
		selectFileEl.current.click();
	};

	useEffect(() => {
		setPreview(value);
	}, [value]);

	const handleChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				onChange(reader.result);
				setPreview(reader.result);
			};
			reader.onerror = (error) => {
				console.error(error);
			};
		}
	};
	return (
		<Stack direction="row" alignItems="center" spacing={2}>
			<Box>
				{preview && (
					<Image
						src={preview.startsWith('data:') ? preview : cloudinary.w300(preview)}
						ratio="16/9"
						sx={{ width: 250, borderRadius: 1 }}
					/>
				)}
			</Box>
			<Input
				ref={selectFileEl}
				accept="image/*"
				id="icon-button-file"
				type="file"
				onChange={handleChange}
				required={required}
			/>
			<IconButton
				color="primary"
				aria-label="upload picture"
				component="span"
				onClick={handleSelectFile}
			>
				<PhotoCamera />
			</IconButton>
		</Stack>
	);
}
