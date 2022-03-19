import axios from '../utils/axios';

const userApi = {
	getAll(params) {
		const url = '/api/users';
		return axios.get(url, { params });
	},

	update(data) {
		const url = `/api/users/${data.id}`;
		return axios.put(url, data);
	},

	getAllInstructors(params) {
		const url = '/api/instructors';
		return axios.get(url, { params });
	},

	forgotPassword(data) {
		const url = '/api/auth/forgot-password';
		return axios.post(url, data);
	},

	checkRequestResetPassword(id, token) {
		const url = `/api/auth/reset-password/${id}/${token}`;
		return axios.get(url);
	},

	resetPassword(data, id, token) {
		const url = `/api/auth/reset-password/${id}/${token}`;
		return axios.post(url, data);
	},
};

export default userApi;
