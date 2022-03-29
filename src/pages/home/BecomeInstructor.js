// @mui
import { styled } from '@mui/material/styles';
import { Container, CardHeader, Typography, Box, Grid, Alert } from '@mui/material';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { CourseHero } from '../../sections/courses';
import { ApplyAsInstructorForm } from '../../sections/become-instructor';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

export default function BecomeInstructor() {
	const { user } = useAuth();
	return (
		<Page title="Become A Instructor">
			<RootStyle>
				<CourseHero
					label="Become A Instructor"
					src={`${window.location.origin}/assets/images/my-learning.jpg`}
				/>
				<Container maxWidth="lg" sx={{ mt: 12, mb: 10 }}>
					<Box sx={{ textAlign: 'center' }}>
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
						<Typography variant="body2" sx={{ mb: 4 }}>
							Lid est laborum dolo rumes fugats untras. Etharums ser quidem rerum facilis dolores
							nemis omnis fugats vitaes nemo minima rerums unsers sadips amets. Sed ut perspiciatis
							unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
							rem aperiam.
						</Typography>
					</Box>

					<Grid container spacing={5}>
						<Grid item xs={12} md={8}>
							<Box>
								<Image src="/assets/images/become-instructor.png" ratio="16/9" />
							</Box>
						</Grid>

						<Grid item xs={12} md={4}>
							{user?.isInstructor ? (
								<Alert success>You are already a instructor</Alert>
							) : user?.isApply ? (
								<Alert>Your have already sent the request. Please wait for approvement</Alert>
							) : (
								<ApplyAsInstructorForm />
							)}
						</Grid>
					</Grid>
				</Container>
			</RootStyle>
		</Page>
	);
}
