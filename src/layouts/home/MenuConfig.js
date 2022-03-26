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
		icon: <Iconify icon={'ant-design:home-filled'} {...ICON_SIZE} />,
		path: '/',
	},
	{
		title: 'My Learning',
		icon: <Iconify icon={'fluent:learning-app-24-filled'} {...ICON_SIZE} />,
		path: PATH_HOME.myLearning.root,
	},
	{
		title: 'Courses',
		icon: <Iconify icon={'el:book'} {...ICON_SIZE} />,
		path: PATH_HOME.courses.root,
	},
];

export default menuConfig;
