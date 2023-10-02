import IdeasApi from '../services/ideasApi';
import IdeaList from './IdeaList';

class IdeaForm {
	constructor() {
		this._formModal = document.querySelector('#form-modal');
		this._form;
		this._ideaList = new IdeaList();
	}

	addEventListeners() {
		this._form.addEventListener('submit', this.handleSubmit.bind(this));
	}

	async handleSubmit(e) {
		e.preventDefault();

		if (
			!this._form.elements.text.value ||
			!this._form.elements.tag.value ||
			!this._form.elements.username.value
		) {
			alert('Please enter all fields.');
			return;
		}
		// save user to local storage
		localStorage.setItem('username', this._form.elements.username.value);

		const idea = {
			text: this._form.elements.text.value,
			tag: this._form.elements.tag.value,
			username: this._form.elements.username.value,
		};

		const res = await IdeasApi.createIdeas(idea);
		if (res.data.success === true) {
			this._ideaList.addIdeaToDom(res.data.data);
		}

		// clear field
		this._form.elements.text.value = '';
		this._form.elements.tag.value = '';
		this._form.elements.username.value = '';
		document.dispatchEvent(new Event('closeModal'));
		this.render();
	}

	render() {
		this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value="${localStorage.getItem('username') || ''}"
      />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea
        name="text"
        id="idea-text"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      
      <select name="tag" id="tag">
      <option disabled selected value> -- choose a tag -- </option>
      <option value="education">education</option>
        <option value="business">business</option>
        <option value="inventions">inventions</option>
        <option value="software">software</option>
        <option value="health">health</option>
      </select>
    </div>
    <button
      class="btn"
      type="submit"
      id="submit"
    >
      Submit
    </button>
  </form>`;
		this._form = document.querySelector('#idea-form');

		this.addEventListeners();
	}
}

export default IdeaForm;
