import axios from '../utils/axios';

const courseApi = {
	getAll(params) {
		const url = '/api/courses';
		return axios.get(url, { params });
	},

	get(id) {
		const url = `/api/courses/${id}`;
		return axios.get(url);
	},

	add(data) {
		const url = '/api/courses';
		return axios.post(url, data);
	},

	update(data) {
		const url = `/api/courses/${data.id}`;
		return axios.put(url, data);
	},

	remove(id) {
		const url = `/api/courses/${id}`;
		return axios.delete(url);
	},

	getStudents(id) {
		const url = `/api/classes/${id}`;
		return axios.get(url);
	},
};

export default courseApi;
