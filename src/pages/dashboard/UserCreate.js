import { useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewForm from '../../sections/@dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
	const { pathname } = useLocation();
	const isEdit = pathname.includes('edit');

	const currentUser = {};

	return (
		<Page title="User: Create a new user">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading={!isEdit ? 'Create a new user' : 'Edit user'}
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{ name: 'User', href: PATH_DASHBOARD.user.list },
						{ name: !isEdit ? 'New user' : 'Edit user' },
					]}
				/>

				<UserNewForm isEdit={isEdit} currentUser={currentUser} />
			</Container>
		</Page>
	);
}
