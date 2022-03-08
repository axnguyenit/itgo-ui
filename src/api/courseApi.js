import axios from '../utils/axios';

const courseApi = {
	async getAll(params) {
		const url = '/api/courses';
		return axios.get(url, { params });
	},

	async get(id) {
		const url = `/api/courses/${id}`;
		return axios.get(url);
	},

	async add(data) {
		const url = '/api/courses';
		return axios.post(url, data);
	},

	async update(data) {
		const url = `/api/courses/${data.id}`;
		return axios.put(url, data);
	},

	async remove(id) {
		const url = `/api/courses/${id}`;
		return axios.delete(url);
	},
};

export default courseApi;
