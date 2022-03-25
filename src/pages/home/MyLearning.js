import React, { useState, useEffect } from 'react';
import { Container, Pagination, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page';
import { CourseHero } from '../../sections/courses';
import orderApi from '../../api/orderApi';
import { CourseList } from '../../sections/my-learning';
import EmptyContent from '../../components/EmptyContent';

const RootStyle = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(8),
	[theme.breakpoints.up('md')]: {
		paddingTop: theme.spacing(11),
	},
}));

const LIMIT_COURSE = 8;

function MyLearning(props) {
	const [page, setPage] = useState(1);
	const [enrolledCourseList, setEnrolledCourseList] = useState([]);
	const [pagination, setPagination] = useState(1);

	useEffect(() => {
		const getEnrolledCourses = async () => {
			try {
				const params = { _page: page, _limit: LIMIT_COURSE };
				const response = await orderApi.getByUser(params);
				setEnrolledCourseList(response.data.orders);
				setPagination(response.data.pagination);
			} catch (error) {
				console.error(error);
			}
		};

		getEnrolledCourses();
	}, [page]);

	return (
		<Page title="My Learning">
			<RootStyle>
				<CourseHero
					label="My Learning"
					src={`${window.location.origin}/assets/images/my-learning.jpg`}
				/>
				<Container sx={{ mt: 15, mb: 10 }}>
					<CourseList orders={enrolledCourseList} loading={!enrolledCourseList.length} />

					{!enrolledCourseList.length && (
						<Stack>
							<EmptyContent
								title="Orders is empty"
								description="Look like you haven't purchased any courses yet"
							/>
						</Stack>
					)}
					{pagination._totalRows > LIMIT_COURSE && (
						<Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 3 }}>
							<Pagination
								count={Math.ceil(pagination._totalRows / LIMIT_COURSE)}
								onChange={(event, value) => setPage(value)}
								color="primary"
								variant="outlined"
								shape="rounded"
							/>
						</Stack>
					)}
				</Container>
			</RootStyle>
		</Page>
	);
}

export default MyLearning;
