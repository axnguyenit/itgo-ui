import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

BasedGuard.propTypes = {
	children: PropTypes.node,
};

export default function BasedGuard({ children }) {
	const { isAuthenticated, isInitialized } = useAuth();

	if (!isInitialized) return <LoadingScreen />;

	if (!isAuthenticated) return <Navigate to={PATH_AUTH.login} />;

	return <>{children}</>;
}
