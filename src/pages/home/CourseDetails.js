import { capitalCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Grid, Stack, Tab } from '@mui/material';
// components
import {
	CourseHero,
	// CourseDetailsReview,
	CourseDetailsSummary,
	RelatedCourses,
} from '../../sections/courses';
import Page from '../../components/Page';
import { PATH_PAGE } from '../../routes/paths';
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

const TAB_LIST = ['overview', 'requirements', 'target-audiences', 'reviews'];

export default function CourseDetails() {
	const { id } = useParams();
	const [currentTab, setCurrentTab] = useState('overview');
	const [course, setCourse] = useState(null);
	const [courses, setCourses] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const tab = searchParams.get('tab');
		if (tab) {
			const existTab = TAB_LIST.find((item) => item === tab);
			if (existTab) setCurrentTab(existTab);
		}
	}, [searchParams]);

	useEffect(() => {
		const getCourse = async () => {
			try {
				const response = await courseApi.get(id);
				setCourse(response.data.course);
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
		};

		const getCourses = async () => {
			const params = {
				_page: 1,
				_limit: 7,
			};
			try {
				const response = await courseApi.getAll(params);
				setCourses(response.data.courses);
			} catch (error) {
				console.error(error);
			}
		};

		getCourses();
		getCourse();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleChangeTab = (value) => {
		setCurrentTab(value);
		setSearchParams({ tab: value });
	};

	return (
		<Page title="Course Details">
			<RootStyle>
				<CourseHero
					label="Course Details"
					src={`${window.location.origin}/assets/images/courses-hero.jpg`}
				/>

				<Container sx={{ mt: 15, mb: 10 }}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={8} spacing={3}>
							{course && <CourseDetailsSummary course={course} />}

							<Stack sx={{ mt: 3 }}>
								<TabContext value={currentTab}>
									<TabList onChange={(e, value) => handleChangeTab(value)}>
										{TAB_LIST.map((tab) => (
											<Tab key={tab} disableRipple value={tab} label={capitalCase(tab)} />
										))}
									</TabList>

									<Divider />

									<TabPanel value="overview">
										<Box sx={{ py: 4 }}>
											<Markdown children={course?.details.overview} />
										</Box>
									</TabPanel>
									<TabPanel value="requirements">
										<Box sx={{ py: 4 }}>
											<Markdown children={course?.details.requirements} />
										</Box>
									</TabPanel>
									<TabPanel value="target-audiences">
										<Box sx={{ py: 4 }}>
											<Markdown children={course?.details.targetAudiences} />
										</Box>
									</TabPanel>
									<TabPanel value="reviews">
										Tab 4{/* <CourseDetailsReview product={product} /> */}
									</TabPanel>
								</TabContext>
							</Stack>
						</Grid>

						<Grid item xs={12} md={4}>
							{courses && <RelatedCourses courses={courses} />}
						</Grid>
					</Grid>
				</Container>
			</RootStyle>
		</Page>
	);
}
