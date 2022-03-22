import axios from '../utils/axios';

const zoomApi = {
	getSignature(data) {
		const url = '/api/zoom';
		return axios.post(url, data);
	},
};

export default zoomApi;
