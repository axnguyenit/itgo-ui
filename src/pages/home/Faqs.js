// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../../components/Page';
import { FaqsHero, FaqsList } from '../../sections/faqs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

export default function Faqs() {
	return (
		<Page title="Faqs">
			<RootStyle>
				<FaqsHero />
				<Container sx={{ mt: 15, mb: 10 }}>
					<FaqsList />
				</Container>
			</RootStyle>
		</Page>
	);
}
