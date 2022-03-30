import axios from '../utils/axios';

const technologiesApi = {
	getAll(params) {
		const url = '/api/technologies';
		return axios.get(url, { params });
	},

	get(id) {
		const url = `/api/technologies/${id}`;
		return axios.get(url);
	},

	add(data) {
		const url = '/api/technologies';
		return axios.post(url, data);
	},

	update(data) {
		const url = `/api/technologies/${data.id}`;
		return axios.put(url, data);
	},

	remove(id) {
		const url = `/api/technologies/${id}`;
		return axios.delete(url);
	},
};

export default technologiesApi;
