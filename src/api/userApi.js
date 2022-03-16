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
};

export default userApi;
