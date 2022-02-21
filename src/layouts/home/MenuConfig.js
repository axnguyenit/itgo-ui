// routes
import { PATH_HOME } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
	width: 22,
	height: 22,
};

const menuConfig = [
	{
		title: 'Home',
		icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
		path: '/',
	},
	{
		title: 'My Learning',
		icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
		path: PATH_HOME.myLearning.root,
	},
	{
		title: 'Roadmap',
		path: '/roadmap',
		icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
		children: [
			{
				subheader: 'Roadmap',
				items: [
					{ title: 'Front End', path: PATH_HOME.roadmap.specialization },
					{ title: 'Back End', path: PATH_HOME.roadmap.specialization },
				],
			},
		],
	},
	{
		title: 'Instructors',
		icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
		path: PATH_HOME.instructors.root,
	},
];

export default menuConfig;
