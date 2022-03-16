// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
	<SvgIconStyle src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
	blog: getIcon('ic_blog'),
	cart: getIcon('ic_cart'),
	book: getIcon('ic_book'),
	chat: getIcon('ic_chat'),
	mail: getIcon('ic_mail'),
	user: getIcon('ic_user'),
	kanban: getIcon('ic_kanban'),
	banking: getIcon('ic_banking'),
	calendar: getIcon('ic_calendar'),
	ecommerce: getIcon('ic_ecommerce'),
	analytics: getIcon('ic_analytics'),
	dashboard: getIcon('ic_dashboard'),
	booking: getIcon('ic_booking'),
};

const navConfig = [
	// GENERAL
	// ----------------------------------------------------------------------
	{
		subheader: 'general',
		items: [
			{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
			// { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
			// { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
			// { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
			// { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
		],
	},

	// MANAGEMENT
	// ----------------------------------------------------------------------
	{
		subheader: 'management',
		items: [
			// MANAGEMENT : USER
			{
				title: 'user',
				path: PATH_DASHBOARD.user.root,
				icon: ICONS.user,
				children: [
					{ title: 'list', path: PATH_DASHBOARD.user.list },
					{ title: 'create', path: PATH_DASHBOARD.user.newUser },
				],
			},

			// MANAGEMENT : COURSES
			{
				title: 'courses',
				path: PATH_DASHBOARD.courses.root,
				icon: ICONS.book,
				children: [
					{ title: 'list', path: PATH_DASHBOARD.courses.list },
					{ title: 'create', path: PATH_DASHBOARD.courses.newCourse },
				],
			},
		],
	},
];

export default navConfig;
