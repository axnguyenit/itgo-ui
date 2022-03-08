import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/auth/Login';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

BasedGuard.propTypes = {
	children: PropTypes.node,
};

export default function BasedGuard({ children }) {
	const { isAuthenticated, isInitialized } = useAuth();

	if (!isInitialized) return <LoadingScreen />;

	if (!isAuthenticated) return <Login />;

	return <>{children}</>;
}
