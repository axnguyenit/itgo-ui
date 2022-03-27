// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
	<SvgIconStyle src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
	// cart: getIcon('ic_cart'),
	// chat: getIcon('ic_chat'),
	// calendar: getIcon('ic_calendar'),
	user: getIcon('ic_user'),
	book: getIcon('ic_book'),
	dashboard: getIcon('ic_dashboard'),
	roadmap: getIcon('ic_road'),
	technology: getIcon('ic_technology'),
};

const navConfig = [
	// GENERAL
	// ----------------------------------------------------------------------
	{
		subheader: 'general',
		items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
	},

	// MANAGEMENT
	// ----------------------------------------------------------------------
	{
		subheader: 'management',
		items: [
			// MANAGEMENT : USER
			{
				title: 'users',
				path: PATH_DASHBOARD.users.root,
				icon: ICONS.user,
			},

			// MANAGEMENT : COURSES
			{
				title: 'courses',
				path: PATH_DASHBOARD.courses.root,
				icon: ICONS.book,
			},

			// MANAGEMENT : COURSES
			{
				title: 'roadmaps',
				path: PATH_DASHBOARD.roadmaps.root,
				icon: ICONS.roadmap,
			},

			// MANAGEMENT : COURSES
			{
				title: 'technologies',
				path: PATH_DASHBOARD.technologies.root,
				icon: ICONS.technology,
			},
		],
	},
];

export default navConfig;
