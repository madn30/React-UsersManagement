import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class postsStore {
	Posts = [];
	FilteredPost = [];
	taskcompleted = false;
	ShowAddComp = false;
	NewPostTitle = '';
	NewPostBody = '';

	constructor() {
		makeAutoObservable(this);
	}

	fetchAllPosts() {
		axios
			.get('https://jsonplaceholder.typicode.com/posts')
			.then(response => {
				this.Posts = [...response.data];
			})
			.catch(err => {
				console.log('in axios ', err);
			});
	}
	_FilterPost(userid) {
		let FilteredPost = this.Posts.filter(post => post.userId === userid);
		FilteredPost.splice(3);
		this.FilteredPost = FilteredPost;
	}
}
const store = new postsStore();
export default store;
