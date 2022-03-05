import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://127.0.0.1:8000',
	headers: {
		'Content-Type': 'application/json',
		'x-auth-token':
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjFmMDdjMTNlYmMzM2FjNDE0MDMzOTgiLCJmaXJzdE5hbWUiOiJLaGEiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoia2hhLml0QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzSW5zdHJ1Y3RvciI6ZmFsc2UsImlhdCI6MTY0NjQ3NzY1NiwiZXhwIjoxNjQ2NDgxMjU2fQ.OZJr17g75dGIyD1DwtpMxvsX7TVi1jWCdZtrippeop8',
	},
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		throw error;
	}
);

export default axiosClient;
