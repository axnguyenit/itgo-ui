import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
	height: 96,
	display: 'flex',
	justifyContent: 'space-between',
	padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

CourseListToolbar.propTypes = {
	filterName: PropTypes.string,
	onFilterName: PropTypes.func,
};

export default function CourseListToolbar({ filterName, onFilterName }) {
	return (
		<RootStyle>
			<InputStyle
				stretchStart={240}
				value={filterName}
				onChange={(event) => onFilterName(event.target.value)}
				placeholder="Search course..."
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Iconify
								icon={'eva:search-fill'}
								sx={{ color: 'text.disabled', width: 20, height: 20 }}
							/>
						</InputAdornment>
					),
				}}
			/>

			{/* <Tooltip title="Filter list">
				<IconButton>
					<Iconify icon={'ic:round-filter-list'} />
				</IconButton>
			</Tooltip> */}
		</RootStyle>
	);
}
