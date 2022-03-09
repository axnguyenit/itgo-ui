import axios from '../utils/axios';

const cartApi = {
	// async getAll(params) {
	// 	const url = '/api/cart';
	// 	return axios.get(url, { params });
	// },

	async get() {
		const url = '/api/cart';
		return axios.get(url);
	},

	async add(data) {
		const url = '/api/cart';
		return axios.post(url, data);
	},

	// async update(data) {
	// 	const url = `/api/cart/${data.id}`;
	// 	return axios.put(url, data);
	// },

	async removeItem(id) {
		const url = `/api/cart/${id}`;
		return axios.delete(url);
	},
};

export default cartApi;
