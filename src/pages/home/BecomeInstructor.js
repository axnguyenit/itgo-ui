// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, CardHeader, Typography, Box, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { CourseHero } from '../../sections/courses';
import { ApplyAsInstructorForm, InstructorRules } from '../../sections/become-instructor';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

export default function BecomeInstructor() {
	return (
		<Page title="Become A Instructor">
			<RootStyle>
				<CourseHero
					label="Become A Instructor"
					src={`${window.location.origin}/assets/images/courses-hero.jpg`}
				/>
				<Container maxWidth={'lg'} sx={{ mt: 12, mb: 10, textAlign: 'center' }}>
					<Stack sx={{ mb: 4 }} spacing={3}>
						<CardHeader
							title="Apply As Instructor"
							subheader="Lorem ipsum dolor sit amet, consectetur"
							sx={{
								'& .MuiCardHeader-action': {
									alignSelf: 'center',
								},
								'& .MuiCardHeader-title': {
									fontSize: 28,
								},
								mb: 2,
							}}
						/>

						<Stack sx={{ width: '80%' }}>
							<Typography variant="body2">
								Lid est laborum dolo rumes fugats untras. Etharums ser quidem rerum facilis dolores
								nemis omnis fugats vitaes nemo minima rerums unsers sadips amets. Sed ut
								perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
								laudantium, totam rem aperiam.
							</Typography>
						</Stack>

						<Box>
							<Image src="/assets/images/become-instructor.png" ratio="16/9" />
						</Box>
					</Stack>

					<Stack>
						<CardHeader
							title="How to become a Instructor"
							subheader="Lorem ipsum dolor sit amet, consectetur"
							sx={{
								'& .MuiCardHeader-action': {
									alignSelf: 'center',
								},
								'& .MuiCardHeader-title': {
									fontSize: 28,
								},
								mb: 5,
							}}
						/>

						<Grid container spacing={5}>
							<Grid item sm={12} md={4}>
								<ApplyAsInstructorForm />
							</Grid>
							<Grid item sm={12} md={8}>
								<InstructorRules />
							</Grid>
						</Grid>
					</Stack>
				</Container>
			</RootStyle>
		</Page>
	);
}
