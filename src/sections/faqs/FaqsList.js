// @mui
import { Stack, Typography } from '@mui/material';
//
// import ProfileAbout from './ProfileAbout';
import FaqsCard from './FaqsCard';
import FaqsPostInput from './FaqsPostInput';
// import ProfileFollowInfo from './ProfileFollowInfo';
// import ProfileSocialInfo from './ProfileSocialInfo';

import { _userFeeds } from '../../_mock';

// ----------------------------------------------------------------------

export default function FaqsList() {
	return (
		<Stack spacing={4}>
			<FaqsPostInput />
			<Typography variant="h3">Frequently asked questions</Typography>
			{_userFeeds.map((post) => (
				<FaqsCard key={post.id} post={post} />
			))}
		</Stack>
	);
}
