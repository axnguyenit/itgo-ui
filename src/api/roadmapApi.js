import axios from '../utils/axios';

const roadmapApi = {
	getAll(params) {
		const url = '/api/roadmaps';
		return axios.get(url, { params });
	},

	get(id) {
		const url = `/api/roadmaps/${id}`;
		return axios.get(url);
	},

	add(data) {
		const url = '/api/roadmaps';
		return axios.post(url, data);
	},

	update(data) {
		const url = `/api/roadmaps/${data.id}`;
		return axios.put(url, data);
	},

	remove(id) {
		const url = `/api/roadmaps/${id}`;
		return axios.delete(url);
	},
};

export default roadmapApi;
