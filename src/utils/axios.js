import axios from 'axios';
import queryString from 'query-string';
// config
import { HOST_API } from '../config';
import { setSession } from './jwt';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
	baseURL: HOST_API,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosInstance.interceptors.request.use(async (config) => config);

axiosInstance.interceptors.response.use(
	async (response) => {
		const config = response.config;

		// handle access token expired
		if (response.data.code && response.data.code === 401) {
			const refreshToken = window.localStorage.getItem('refreshToken');
			if (!refreshToken) return;

			// get new access token from refresh token
			try {
				const {
					data: { accessToken },
				} = await axiosInstance.post('/api/auth/refresh-token', {
					refreshToken,
				});
				setSession(accessToken, refreshToken);
				config.headers.Authorization = `Bearer ${accessToken}`;
				return axiosInstance(config);
			} catch (error) {
				console.error(error);
			}
		}

		return response;
	},
	(error) => {
		console.error(error.message);
		return Promise.reject((error.response && error.response.data) || 'Something went wrong');
	}
);

export default axiosInstance;
