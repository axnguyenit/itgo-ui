// @mui
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
// sections
import { HomeHero, HomeRoadmapList, HomeInstructorList, HomePopularTech } from 'src/sections/home';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
	overflow: 'hidden',
	position: 'relative',
	backgroundColor: theme.palette.background.default,
}));

const ROADMAPS = [
	{
		title: 'Frontend',
		desc: `Step by step guide to becoming a Frontend Developer in ${new Date().getFullYear()}`,
	},
	{
		title: 'Backend',
		desc: `Step by step guide to becoming a Backend Developer in ${new Date().getFullYear()}`,
	},
	{
		title: 'DevOps',
		desc: `Step by step guide for DevOps or operations role in ${new Date().getFullYear()}`,
	},
	{
		title: 'React',
		desc: `Step by step guide to becoming a React Developer in ${new Date().getFullYear()}`,
	},
	{
		title: 'Android',
		desc: `Step by step guide to becoming an Android Developer in ${new Date().getFullYear()}`,
	},
	{
		title: 'Java',
		desc: `Step by step guide to becoming a Java Developer in ${new Date().getFullYear()}`,
	},
];

export default function Home() {
	return (
		<Page title="Home">
			<HomeHero />
			<ContentStyle>
				<Container sx={{ mt: 15 }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={12}>
							<HomeRoadmapList />
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<HomeInstructorList />
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<HomePopularTech />
						</Grid>
					</Grid>
				</Container>
			</ContentStyle>
		</Page>
	);
}
