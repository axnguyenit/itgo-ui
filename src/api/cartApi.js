import axios from '../utils/axios';

const cartApi = {
	// getAll(params) {
	// 	const url = '/api/cart';
	// 	return axios.get(url, { params });
	// },

	get() {
		const url = '/api/cart';
		return axios.get(url);
	},

	add(data) {
		const url = '/api/cart';
		return axios.post(url, data);
	},

	// update(data) {
	// 	const url = `/api/cart/${data.id}`;
	// 	return axios.put(url, data);
	// },

	removeItem(id) {
		const url = `/api/cart/${id}`;
		return axios.delete(url);
	},
};

export default cartApi;
