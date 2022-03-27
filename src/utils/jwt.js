import axios from './axios';

// ----------------------------------------------------------------------

const setSession = (accessToken, refreshToken) => {
	if (accessToken) {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	} else {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		delete axios.defaults.headers.common.Authorization;
	}
};

export { setSession };
