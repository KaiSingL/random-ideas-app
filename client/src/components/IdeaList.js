import IdeasApi from '../services/ideasApi';

class IdeaList {
	constructor() {
		this._ideaListEl = document.querySelector('#idea-list');
		this._ideas = [];
		this.getIdeas();
		this._validTags = new Set();
		this._validTags.add('technology');
		this._validTags.add('software');
		this._validTags.add('business');
		this._validTags.add('education');
		this._validTags.add('health');
		this._validTags.add('inventions');
	}

	addEventListeners() {
		this._ideaListEl.addEventListener('click', async (e) => {
			if (e.target.classList.contains('fa-times')) {
				e.stopImmediatePropagation();
				const ideaId = e.target.parentElement.parentElement.dataset.id;
				try {
					const res = await IdeasApi.deleteIdea(ideaId);
					if (res.data.success === true) {
						this.removeIdeaFromDom();
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	}

	async getIdeas() {
		try {
			const res = await IdeasApi.getIdeas();
			this._ideas = res.data.data;
			this.render();
		} catch (error) {
			console.log(error);
		}
	}

	addIdeaToDom(idea) {
		this._ideas.push(idea);
		this.render();
	}

	removeIdeaFromDom(idea) {
		this._ideas.splice(this._ideas.indexOf(idea), 1);
		this.render();
	}

	getTagClass(tag) {
		tag = tag.toLowerCase();
		if (this._validTags.has(tag)) {
			return `tag-${tag}`;
		} else {
			return '';
		}
	}

	render() {
		this._ideaListEl.innerHTML = this._ideas
			.map((idea) => {
				const tagClass = this.getTagClass(idea.tag);
				const deleteBtn =
					idea.username === localStorage.getItem('username')
						? '<button class="delete"><i class="fas fa-times"></i></button>'
						: '';
				return `<div class="card" data-id="${idea._id}">
        ${deleteBtn}
      
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>`;
			})
			.join('');
		this.addEventListeners();
	}
}

export default IdeaList;
