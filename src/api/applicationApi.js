import axios from '../utils/axios';

const applicationApi = {
	getAll(params) {
		const url = '/api/applications';
		return axios.get(url, { params });
	},

	get(id) {
		const url = `/api/applications/${id}`;
		return axios.get(url);
	},

	add(data) {
		const url = '/api/applications';
		return axios.post(url, data);
	},

	approve(id) {
		const url = `/api/applications/${id}/approve`;
		return axios.post(url);
	},

	deny(id) {
		const url = `/api/applications/${id}/deny`;
		return axios.post(url);
	},

	removeItem(id) {
		const url = `/api/applications/${id}`;
		return axios.delete(url);
	},
};

export default applicationApi;
