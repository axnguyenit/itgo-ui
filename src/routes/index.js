import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import HomeLayout from '../layouts/home/';
import InstructorLayout from '../layouts/instructor';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import { AuthGuard, InstructorGuard, BasedGuard, GuestGuard } from '../guards';
import { PATH_DASHBOARD, PATH_INSTRUCTOR } from './paths';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { pathname } = useLocation();

	return (
		<Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
			<Component {...props} />
		</Suspense>
	);
};

export default function Router() {
	return useRoutes([
		{
			path: 'auth',
			children: [
				{
					path: 'login',
					element: (
						<GuestGuard>
							<Login />
						</GuestGuard>
					),
				},
				{
					path: 'register',
					element: (
						<GuestGuard>
							<Register />
						</GuestGuard>
					),
				},
				{
					path: 'verify/:id/:token',
					element: (
						<GuestGuard>
							<Verify />
						</GuestGuard>
					),
				},
				{
					path: 'verify',
					element: (
						<GuestGuard>
							<RequestVerify />
						</GuestGuard>
					),
				},
				{
					path: 'forgot-password',
					element: (
						<GuestGuard>
							<ForgotPassword />
						</GuestGuard>
					),
				},
				{
					path: 'reset-password/:id/:token',
					element: (
						<GuestGuard>
							<ResetPassword />
						</GuestGuard>
					),
				},
			],
		},

		// Dashboard Routes
		{
			path: 'dashboard',
			element: (
				<AuthGuard>
					<DashboardLayout />
				</AuthGuard>
			),
			children: [
				{ element: <Navigate to={PATH_DASHBOARD.general.app} replace />, index: true },
				{ path: 'app', element: <GeneralApp /> },
				{
					path: 'users',
					children: [
						{ element: <Users />, index: true },
						{ path: 'create', element: <UserCreate /> },
						{ path: ':name/edit', element: <UserCreate /> },
					],
				},
				{
					path: 'courses',
					children: [
						{ element: <DashboardCourses />, index: true },
						{ path: 'create', element: <CourseCreate /> },
						{ path: ':id/edit', element: <CourseCreate /> },
					],
				},
				{
					path: 'roadmaps',
					children: [
						{ element: <Roadmaps />, index: true },
						{ path: 'create', element: <RoadmapCreate /> },
						{ path: ':id/edit', element: <RoadmapCreate /> },
					],
				},
				{
					path: 'technologies',
					children: [
						{ element: <Technologies />, index: true },
						{ path: 'create', element: <TechnologyCreate /> },
						{ path: ':id/edit', element: <TechnologyCreate /> },
					],
				},
			],
		},

		// Instructor Routes
		{
			path: 'instructor',
			element: (
				<InstructorGuard>
					<InstructorLayout />
				</InstructorGuard>
			),
			children: [
				{ element: <Navigate to={PATH_INSTRUCTOR.calendar} replace />, index: true },
				{ path: 'calendar', element: <InstructorCalendar /> },
				{
					path: 'courses',
					children: [
						{ element: <InstructorCourses />, index: true },
						{ path: 'create', element: <InstructorCourseCreate /> },
						{ path: ':id/students', element: <InstructorStudents /> },
						{ path: ':id/edit', element: <InstructorCourseCreate /> },
					],
				},
			],
		},

		// Home Routes
		{
			path: '',
			element: <HomeLayout />,
			children: [
				{ element: <Home />, index: true },
				{ path: 'checkout', element: <Checkout /> },
				{ path: 'faqs', element: <Faqs /> },
				{ path: 'courses', element: <Courses /> },
				{ path: 'courses/:id', element: <CourseDetails /> },
				{ path: 'roadmap/:id', element: <Roadmap /> },
				{
					path: 'instructor/:id',
					element: (
						<BasedGuard>
							<InstructorProfile />
						</BasedGuard>
					),
				},
				{
					path: 'account-settings',
					element: (
						<BasedGuard>
							<AccountSettings />
						</BasedGuard>
					),
				},
				{
					path: 'my-courses',
					element: (
						<BasedGuard>
							<MyLearning />
						</BasedGuard>
					),
				},
				{
					path: 'my-courses/:id/events',
					element: (
						<BasedGuard>
							<StudentCalendar />
						</BasedGuard>
					),
				},
			],
		},

		// Main Routes
		{
			path: '*',
			element: <LogoOnlyLayout />,
			children: [
				{
					path: 'learning/:id',
					element: (
						<BasedGuard>
							<Learning />
						</BasedGuard>
					),
				},
				{ path: '500', element: <Page500 /> },
				{ path: '404', element: <NotFound /> },
				{ path: '*', element: <Navigate to="/404" replace /> },
			],
		},
		{ path: '*', element: <Navigate to="/404" replace /> },
	]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const RequestVerify = Loadable(lazy(() => import('../pages/auth/RequestVerify')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const Verify = Loadable(lazy(() => import('../pages/auth/Verify')));
const ForgotPassword = Loadable(lazy(() => import('../pages/auth/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Users = Loadable(lazy(() => import('../pages/dashboard/Users')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const DashboardCourses = Loadable(lazy(() => import('../pages/dashboard/Courses')));
const CourseCreate = Loadable(lazy(() => import('../pages/dashboard/CourseCreate')));
const Roadmaps = Loadable(lazy(() => import('../pages/dashboard/Roadmaps')));
const RoadmapCreate = Loadable(lazy(() => import('../pages/dashboard/RoadmapCreate')));
const Technologies = Loadable(lazy(() => import('../pages/dashboard/Technologies')));
const TechnologyCreate = Loadable(lazy(() => import('../pages/dashboard/TechnologyCreate')));
// Instructor
const InstructorCourses = Loadable(lazy(() => import('../pages/instructor/Courses')));
const InstructorCourseCreate = Loadable(lazy(() => import('../pages/instructor/CourseCreate')));
const InstructorCalendar = Loadable(lazy(() => import('../pages/instructor/Calendar')));
const InstructorStudents = Loadable(lazy(() => import('../pages/instructor/Students')));
const InstructorProfile = Loadable(lazy(() => import('../pages/home/InstructorProfile')));

// Home
const Home = Loadable(lazy(() => import('../pages/home/Home')));
const Checkout = Loadable(lazy(() => import('../pages/home/Checkout')));
const Faqs = Loadable(lazy(() => import('../pages/home/Faqs')));
const Roadmap = Loadable(lazy(() => import('../pages/home/Roadmap')));
const Courses = Loadable(lazy(() => import('../pages/home/Courses')));
const CourseDetails = Loadable(lazy(() => import('../pages/home/CourseDetails')));
const Learning = Loadable(lazy(() => import('../pages/home/Learning')));
const AccountSettings = Loadable(lazy(() => import('../pages/home/AccountSettings')));
const MyLearning = Loadable(lazy(() => import('../pages/home/MyLearning')));
const StudentCalendar = Loadable(lazy(() => import('../pages/home/Calendar')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
