// ----------------------------------------------------------------------

function path(root, sublink) {
	return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_HOME = '';
const ROOTS_INSTRUCTOR = '/instructor';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
	root: ROOTS_AUTH,
	login: path(ROOTS_AUTH, '/login'),
	register: path(ROOTS_AUTH, '/register'),
	verify: path(ROOTS_AUTH, '/verify'),
	forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const PATH_PAGE = {
	comingSoon: '/coming-soon',
	maintenance: '/maintenance',
	pricing: '/pricing',
	payment: '/payment',
	about: '/about-us',
	contact: '/contact-us',
	faqs: '/faqs',
	page404: '/404',
	page500: '/500',
	components: '/components',
};

export const PATH_HOME = {
	root: ROOTS_HOME,
	home: path(ROOTS_HOME, '/'),
	account: path(ROOTS_HOME, '/account-settings'),
	myLearning: {
		root: path(ROOTS_HOME, '/my-courses'),
		all: path(ROOTS_HOME, '/'),
	},
	courses: {
		root: path(ROOTS_HOME, '/courses'),
		course: path(ROOTS_HOME, '/courses/:id'),
	},
	roadmap: {
		root: path(ROOTS_HOME, '/roadmap'),
		specialization: path(ROOTS_HOME, '/roadmap/:specialization'),
	},
	checkout: path(ROOTS_HOME, '/checkout'),
};

export const PATH_INSTRUCTOR = {
	root: ROOTS_INSTRUCTOR,
	courses: {
		root: path(ROOTS_INSTRUCTOR, '/courses'),
		course: path(ROOTS_HOME, '/courses/:id'),
		students: path(ROOTS_HOME, '/courses/:id/students'),
		newCourse: path(ROOTS_INSTRUCTOR, '/courses/create'),
		editById: path(ROOTS_INSTRUCTOR, '/courses/:id/edit'),
	},
	calendar: path(ROOTS_INSTRUCTOR, '/calendar'),
};

export const PATH_DASHBOARD = {
	root: ROOTS_DASHBOARD,
	general: {
		app: path(ROOTS_DASHBOARD, '/app'),
		ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
		analytics: path(ROOTS_DASHBOARD, '/analytics'),
		banking: path(ROOTS_DASHBOARD, '/banking'),
		booking: path(ROOTS_DASHBOARD, '/booking'),
	},
	users: {
		root: path(ROOTS_DASHBOARD, '/users'),
		newUser: path(ROOTS_DASHBOARD, '/users/create'),
		editById: path(ROOTS_DASHBOARD, `/users/:id/edit`),
		account: path(ROOTS_DASHBOARD, '/users/account'),
	},
	courses: {
		root: path(ROOTS_DASHBOARD, '/courses'),
		newCourse: path(ROOTS_DASHBOARD, '/courses/create'),
		editById: path(ROOTS_DASHBOARD, '/courses/:id/edit'),
	},
};
