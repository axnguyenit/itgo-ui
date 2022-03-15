import axios from '../utils/axios';

const userApi = {
	update(data) {
		console.log(data);
		const url = `/api/my-account/${data.id}`;
		return axios.put(url, data);
	},
};

export default userApi;
