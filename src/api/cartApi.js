import axios from '../utils/axios';

const cartApi = {
	get() {
		const url = '/api/cart';
		return axios.get(url);
	},

	add(data) {
		const url = '/api/cart';
		return axios.post(url, data);
	},

	removeItem(id) {
		const url = `/api/cart/${id}`;
		return axios.delete(url);
	},
};

export default cartApi;
