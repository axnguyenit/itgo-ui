import axios from '../utils/axios';

const userApi = {
	getAll(params) {
		const url = '/api/users';
		return axios.get(url, { params });
	},

	get(id) {
		const url = `/api/users/user/${id}`;
		return axios.get(url);
	},

	register(data) {
		const url = '/api/auth/register';
		return axios.post(url, data);
	},

	update(data) {
		const url = `/api/users/${data.id}`;
		return axios.put(url, data);
	},

	getAllInstructors(params) {
		const url = '/api/instructors';
		return axios.get(url, { params });
	},

	requestVerifyEmail(data) {
		const url = '/api/auth/verify';
		return axios.post(url, data);
	},

	verifyEmail(id, token) {
		const url = `/api/auth/verify/${id}/${token}`;
		return axios.get(url);
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
