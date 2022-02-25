import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Divider, Grid, Tab } from '@mui/material';
// components
import Page from '../../components/Page';
import { CourseHero, CourseDetailsReview } from '../../sections/courses';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

export default function CourseDetails() {
	const [value, setValue] = useState('1');
	// const { product, error, checkout } = useSelector((state) => state.product);

	return (
		<Page title="Course Details">
			<RootStyle>
				<CourseHero />

				<Container sx={{ mt: 15, mb: 10 }}>
					{/* <FaqsList /> */}
					<Grid container>
						<Grid item sx={12} md={8}>
							<Card>
								<TabContext value={value}>
									<Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
										<TabList onChange={(e, value) => setValue(value)}>
											<Tab disableRipple value="1" label="Overview" />
											<Tab disableRipple value="2" label="Requirements" />
											<Tab disableRipple value="3" label="Target Audiences" />
											<Tab disableRipple value="4" label="Reviews" />
										</TabList>
									</Box>

									<Divider />

									<TabPanel value="1">Tab 1</TabPanel>
									<TabPanel value="2">Tab 2</TabPanel>
									<TabPanel value="3">Tab 3</TabPanel>
									<TabPanel value="4">
										Tab 4{/* <CourseDetailsReview product={product} /> */}
									</TabPanel>
								</TabContext>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</RootStyle>
		</Page>
	);
}
