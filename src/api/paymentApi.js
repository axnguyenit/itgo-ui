import axios from '../utils/axios';

const paymentApi = {
	add(data) {
		const url = `/api/payments`;
		return axios.post(url, data);
	},

	getPayUrl() {
		const url = '/api/payments/url';
		return axios.get(url);
	},
};

export default paymentApi;
