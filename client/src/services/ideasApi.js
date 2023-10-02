import axios from 'axios';

class IdeasApi {
	constructor() {
		this._apiUrl = '/api/ideas/';
	}

	getIdeas() {
		return axios.get(this._apiUrl);
	}

	createIdeas(data) {
		return axios.post(this._apiUrl, data);
	}

	deleteIdea(id) {
		const username = localStorage.getItem('username') || '';

		return axios.delete(`${this._apiUrl}${id}`, { data: { username } });
	}

	updateIdea(id, data) {
		return axiso.put(`${this._apiUrl}${id}`, data);
	}
}

export default new IdeasApi();
