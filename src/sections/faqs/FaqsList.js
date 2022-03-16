// @mui
import { Stack, Typography } from '@mui/material';
//
import FaqsCard from './FaqsCard';
import FaqsPostInput from './FaqsPostInput';

// ----------------------------------------------------------------------

export default function FaqsList() {
	return (
		<Stack spacing={4}>
			<Typography variant="h3">Frequently asked questions</Typography>
			<FaqsPostInput />
			{[...Array(4)].map((post, index) => (
				<FaqsCard key={index} post={post} />
			))}
		</Stack>
	);
}
