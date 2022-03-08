import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Markdown from '../../components/Markdown';
// api
import courseApi from '../../api/courseApi';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

// ----------------------------------------------------------------------

export default function CourseDetails() {
	const { id } = useParams();
	const [value, setValue] = useState('1');
	const [course, setCourse] = useState(null);

	useEffect(() => {
		const getCourse = async () => {
			try {
				const response = await courseApi.get(id);
				if (response.data.success) setCourse(response.data.course);
			} catch (error) {
				console.error(error);
			}
		};
		getCourse();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<Page title="Course Details">
			<RootStyle>
				<CourseHero label="Course Details" />

				<Container sx={{ mt: 15, mb: 10 }}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={8} spacing={3}>
							{course && <CourseDetailsSummary course={course} />}

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
											<Markdown children={course?.details.overview} />
										</Box>
									</TabPanel>
									<TabPanel value="2">
										<Box sx={{ py: 4 }}>
											<Markdown children={course?.details.requirements} />
										</Box>
									</TabPanel>
									<TabPanel value="3">
										<Box sx={{ py: 4 }}>
											<Markdown children={course?.details.targetAudiences} />
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
