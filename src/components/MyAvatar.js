// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
import cloudinary from '../utils/cloudinary';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
	const { user } = useAuth();

	return (
		<Avatar
			src={cloudinary.w100(user?.avatar)}
			alt={`${user?.firstName} ${user?.lastName}`}
			color={user?.avatar ? 'default' : createAvatar(`${user?.firstName} ${user?.lastName}`).color}
			{...other}
		>
			{createAvatar(`${user?.firstName} ${user?.lastName}`).name}
		</Avatar>
	);
}
