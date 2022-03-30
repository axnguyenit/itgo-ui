import axios from '../utils/axios';

const orderApi = {
	getAll(params) {
		const url = '/api/orders';
		return axios.get(url, { params });
	},

	get(id) {
		const url = `/api/orders/${id}`;
		return axios.get(url);
	},

	getByUser(params) {
		const url = '/api/orders/my-orders';
		return axios.get(url, { params });
	},
};

export default orderApi;
