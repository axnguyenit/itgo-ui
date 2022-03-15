import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import HomeLayout from '../layouts/home/';
import InstructorLayout from '../layouts/instructor';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import InstructorGuard from '../guards/InstructorGuard';
import BasedGuard from '../guards/BasedGuard';
import GuestGuard from '../guards/GuestGuard';
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
				{ path: 'login-unprotected', element: <Login /> },
				{ path: 'register-unprotected', element: <Register /> },
				{ path: 'reset-password', element: <ResetPassword /> },
				{ path: 'verify', element: <VerifyCode /> },
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
					path: 'courses',
					children: [
						{
							element: <Navigate to={PATH_DASHBOARD.courses.list} replace />,
							index: true,
						},
						{ path: 'list', element: <CourseList /> },
						{ path: 'new', element: <CourseCreate /> },
						{ path: ':id/edit', element: <CourseCreate /> },
					],
				},
				{
					path: 'user',
					children: [
						{
							element: <Navigate to="/dashboard/user/profile" replace />,
							index: true,
						},
						{ path: 'profile', element: <UserProfile /> },
						{ path: 'cards', element: <UserCards /> },
						{ path: 'list', element: <UserList /> },
						{ path: 'new', element: <UserCreate /> },
						{ path: ':name/edit', element: <UserCreate /> },
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
				{ element: <Navigate to={PATH_INSTRUCTOR.courses.root} replace />, index: true },
				{
					path: 'courses',
					children: [
						{
							element: <Navigate to={PATH_INSTRUCTOR.courses.list} replace />,
							index: true,
						},
						{ path: 'list', element: <InstructorCourses /> },
						{ path: 'new', element: <InstructorCourseCreate /> },
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
				{
					path: 'account-settings',
					element: (
						<BasedGuard>
							<AccountSettings />
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
				{ path: 'learning/:id', element: <Learning /> },
				{ path: '500', element: <Page500 /> },
				{ path: '404', element: <NotFound /> },
				{ path: '*', element: <Navigate to="/404" replace /> },
			],
		},
		// {
		// 	path: '/',
		// 	element: <MainLayout />,
		// 	children: [
		// 		{ element: <HomePage />, index: true },
		// 		{ path: 'about-us', element: <About /> },
		// 		{ path: 'contact-us', element: <Contact /> },
		// 		{ path: 'faqs', element: <Faqs /> },
		// 	],
		// },
		{ path: '*', element: <Navigate to="/404" replace /> },
	]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const CourseList = Loadable(lazy(() => import('../pages/dashboard/CourseList')));
const CourseCreate = Loadable(lazy(() => import('../pages/dashboard/CourseCreate')));
// Instructor
const InstructorCourses = Loadable(lazy(() => import('../pages/instructor/Courses')));
const InstructorCourseCreate = Loadable(lazy(() => import('../pages/instructor/CourseCreate')));

// Main
const Home = Loadable(lazy(() => import('../pages/home/Home')));
const Checkout = Loadable(lazy(() => import('../pages/home/Checkout')));
const Faqs = Loadable(lazy(() => import('../pages/home/Faqs')));
const Courses = Loadable(lazy(() => import('../pages/home/Courses')));
const CourseDetails = Loadable(lazy(() => import('../pages/home/CourseDetails')));
const Learning = Loadable(lazy(() => import('../pages/home/Learning')));
const AccountSettings = Loadable(lazy(() => import('../pages/home/AccountSettings')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
