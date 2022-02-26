import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Divider, Grid, Stack, Tab } from '@mui/material';
// components
import Page from '../../components/Page';
import {
	CourseHero,
	// CourseDetailsReview,
	CourseDetailsSummary,
	LatestCourses,
} from '../../sections/courses';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Markdown from 'src/components/Markdown';

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
					<Grid container spacing={4}>
						<Grid item xs={12} md={8} spacing={3}>
							<CourseDetailsSummary />

							<Stack sx={{ mt: 3 }}>
								<TabContext value={value}>
									<TabList onChange={(e, value) => setValue(value)}>
										<Tab disableRipple value="1" label="Overview" />
										<Tab disableRipple value="2" label="Requirements" />
										<Tab disableRipple value="3" label="Target Audiences" />
										<Tab disableRipple value="4" label="Reviews" />
									</TabList>

									<Divider />

									<TabPanel value="1">
										<Box sx={{ py: 4 }}>
											<Markdown
												children={`\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n`}
											/>
										</Box>
									</TabPanel>
									<TabPanel value="2">
										<Box sx={{ py: 4 }}>
											<Markdown
												children={`\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n`}
											/>
										</Box>
									</TabPanel>
									<TabPanel value="3">
										<Box sx={{ py: 4 }}>
											<Markdown
												children={`\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n`}
											/>
										</Box>
									</TabPanel>
									<TabPanel value="4">
										Tab 4{/* <CourseDetailsReview product={product} /> */}
									</TabPanel>
								</TabContext>
							</Stack>
						</Grid>

						<Grid item xs={12} md={4}>
							<LatestCourses />
						</Grid>
					</Grid>
				</Container>
			</RootStyle>
		</Page>
	);
}
