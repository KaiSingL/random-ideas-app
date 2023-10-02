class Modal {
	constructor() {
		this._modal = document.querySelector('#modal');
		this._modalBtn = document.querySelector('#modal-btn');
		this.addEventListeners();
	}

	openModal() {
		this._modal.style.display = 'block';
	}

	closeModal(e) {
		if (e.target.id === 'modal') {
			this._modal.style.display = 'none';
		}
	}

	addEventListeners() {
		this._modalBtn.addEventListener('click', this.openModal.bind(this));
		this._modal.addEventListener('click', this.closeModal.bind(this));
		document.addEventListener(
			'closeModal',
			() => (this._modal.style.display = 'none')
		);
	}
}

module.exports = Modal;
