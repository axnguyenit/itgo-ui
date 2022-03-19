// @mui
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
// sections
import {
	HomeHero,
	HomeWidgetSummary,
	HomeInstructorList,
	HomePopularTech,
} from 'src/sections/home';
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../assets';
// import jwtDecode from 'jwt-decode';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
	overflow: 'hidden',
	position: 'relative',
	backgroundColor: theme.palette.background.default,
}));

export default function Home() {
	return (
		<Page title="Home">
			<HomeHero />
			<ContentStyle>
				<Container sx={{ mt: 15 }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<HomeWidgetSummary
								title="Experienced instructors"
								total={714000}
								icon={<BookingIllustration />}
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<HomeWidgetSummary title="Students" total={311000} icon={<CheckInIllustration />} />
						</Grid>

						<Grid item xs={12} md={4}>
							<HomeWidgetSummary
								title="The best programming learning platform"
								total={'1st'}
								icon={<CheckOutIllustration />}
							/>
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
