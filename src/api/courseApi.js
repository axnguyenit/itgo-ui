import axiosClient from './axiosClient';

const courseApi = {
	async getAll(params) {
		const url = '/api/courses';
		return axiosClient.get(url, { params });
	},

	async get(id) {
		const url = `/api/courses/${id}`;
		return axiosClient.get(url);
	},

	async add(data) {
		const url = '/api/courses';
		return axiosClient.post(url, data);
	},

	async update(data) {
		const url = `/api/courses/${data.id}`;
		return axiosClient.put(url, data);
	},

	async remove(id) {
		const url = `/api/courses/${id}`;
		return axiosClient.delete(url);
	},
};

export default courseApi;
