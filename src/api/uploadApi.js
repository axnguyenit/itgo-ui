import axios from '../utils/axios';

const uploadApi = {
	addCourseImage(data) {
		const url = '/api/upload/course-image';
		return axios.post(url, data);
	},

	addAvatar(data) {
		const url = '/api/upload/avatar';
		return axios.post(url, data);
	},
};

export default uploadApi;
