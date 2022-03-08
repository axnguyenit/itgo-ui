import axios from '../utils/axios';

const uploadApi = {
	async addCourseImage(data) {
		const url = '/api/upload/course-image';
		return axios.post(url, data);
	},
};

export default uploadApi;
