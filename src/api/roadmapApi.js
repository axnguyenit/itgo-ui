import axios from '../utils/axios';

const roadmapApi = {
	getAll(params) {
		const url = '/api/roadmap';
		return axios.get(url, { params });
	},

	get(id) {
		const url = `/api/roadmap/${id}`;
		return axios.get(url);
	},

	add(data) {
		const url = '/api/roadmap';
		return axios.post(url, data);
	},

	update(data) {
		const url = `/api/roadmap/${data.id}`;
		return axios.put(url, data);
	},

	remove(id) {},
};

export default roadmapApi;
