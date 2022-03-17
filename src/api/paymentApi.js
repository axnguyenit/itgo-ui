import axios from '../utils/axios';

const paymentApi = {
	// add(data) {
	// 	const url = `/api/payment`;
	// 	return axios.post(url, data);
	// },

	getPayUrl() {
		const url = '/api/payment/url';
		return axios.get(url);
	},
};

export default paymentApi;
