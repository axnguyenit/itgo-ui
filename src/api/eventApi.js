import axios from '../utils/axios';

const eventApi = {
	getByInstructor() {
		const url = '/api/events/get-by-instructor';
		return axios.get(url);
	},

	getByStudent(courseId) {
		const url = `api/events/get-by-student/${courseId}`;
		return axios.get(url);
	},

	add(data) {
		const url = '/api/events';
		return axios.post(url, data);
	},

	update(data) {
		const url = `/api/events/${data.id}`;
		return axios.put(url, data);
	},

	remove(id) {
		const url = `/api/events/${id}`;
		return axios.delete(url);
	},
};

export default eventApi;
