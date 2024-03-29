import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Stack, Pagination } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { ProfileCover } from '../../sections/profile';
import { CourseList } from '../../sections/courses';
// api
import courseApi from '../../api/courseApi';
import userApi from '../../api/userApi';
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
	zIndex: 9,
	bottom: 0,
	width: '100%',
	display: 'flex',
	position: 'absolute',
	backgroundColor: theme.palette.background.paper,
	[theme.breakpoints.up('sm')]: {
		justifyContent: 'center',
	},
	[theme.breakpoints.up('md')]: {
		justifyContent: 'flex-end',
		paddingRight: theme.spacing(3),
	},
}));

// ----------------------------------------------------------------------
const LIMIT_COURSE = 8;

export default function InstructorProfile() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [user, setUser] = useState([]);
	const [courses, setCourses] = useState([]);
	const [pagination, setPagination] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [currentTab, setCurrentTab] = useState('courses');

	const handleChangeTab = (newValue) => {
		setCurrentTab(newValue);
	};

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			const params = {
				_page: page,
				_limit: LIMIT_COURSE,
				_instructor: id,
			};

			try {
				const response = await courseApi.getAll(params);
				const res = await userApi.get(id);
				setUser(res.data.user);
				setCourses(response.data.courses);
				setPagination(response.data.pagination);
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
			setIsLoading(false);
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const PROFILE_TABS = [
		{
			value: 'courses',
			icon: <Iconify icon={'el:book'} width={20} height={20} />,
			component: <CourseList courses={courses} loading={isLoading} />,
		},
		{
			value: 'about',
			icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
			component: <></>,
		},
	];

	return (
		<Page title="User: Profile">
			<Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
				<Card
					sx={{
						mb: 4,
						height: 280,
						position: 'relative',
					}}
				>
					<ProfileCover myProfile={user} />

					<TabsWrapperStyle>
						<Tabs
							value={currentTab}
							scrollButtons="auto"
							variant="scrollable"
							allowScrollButtonsMobile
							onChange={(e, value) => handleChangeTab(value)}
						>
							{PROFILE_TABS.map((tab) => (
								<Tab
									disableRipple
									key={tab.value}
									value={tab.value}
									icon={tab.icon}
									label={capitalCase(tab.value)}
								/>
							))}
						</Tabs>
					</TabsWrapperStyle>
				</Card>

				{PROFILE_TABS.map((tab) => {
					const isMatched = tab.value === currentTab;
					return isMatched && <Box key={tab.value}>{tab.component}</Box>;
				})}

				{currentTab === 'courses' && pagination._totalRows > LIMIT_COURSE && (
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
		</Page>
	);
}
