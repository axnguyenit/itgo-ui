import axios from 'axios';
import queryString from 'query-string';
// config
import { HOST_API } from '../config';

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
	(response) => response,
	(error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
