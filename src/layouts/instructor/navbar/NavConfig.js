// routes
import { PATH_INSTRUCTOR } from '../../../routes/paths';
// components
// import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
	<SvgIconStyle src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
	book: getIcon('ic_book'),
	user: getIcon('ic_user'),
};

const navConfig = [
	// MANAGEMENT
	// ----------------------------------------------------------------------
	{
		subheader: 'management',
		items: [
			// MANAGEMENT : USER
			// {
			// 	title: 'student',
			// 	path: PATH_INSTRUCTOR.user.root,
			// 	icon: ICONS.user,
			// 	children: [
			// 		{ title: 'profile', path: PATH_INSTRUCTOR.user.profile },
			// 		{ title: 'cards', path: PATH_INSTRUCTOR.user.cards },
			// 		{ title: 'list', path: PATH_INSTRUCTOR.user.list },
			// 		{ title: 'create', path: PATH_INSTRUCTOR.user.newUser },
			// 		{ title: 'edit', path: PATH_INSTRUCTOR.user.editById },
			// 	],
			// },

			// MANAGEMENT : COURSES
			{
				title: 'courses',
				path: PATH_INSTRUCTOR.courses.root,
				icon: ICONS.book,
				children: [
					{ title: 'list', path: PATH_INSTRUCTOR.courses.list },
					{ title: 'create', path: PATH_INSTRUCTOR.courses.newCourse },
				],
			},
		],
	},
];

export default navConfig;
