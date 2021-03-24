import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import userstore from './UsersStore';
class TodoStore {
	Todos = [];
	FilterTodos = [];
	taskcompleted = [];
	ShowAddComp = false;
	NewTodoTitle = '';

	constructor() {
		makeAutoObservable(this);
	}

	fetchAllTodos() {
		axios
			.get('https://jsonplaceholder.typicode.com/todos')
			.then(response => {
				this.Todos = [...response.data];
			})
			.catch(err => {
				console.log('in axios ', err);
			});
	}

	_FilterTodos(userid) {
		let FilteredTodos = this.Todos.filter(todo => todo.userId === userid);
		FilteredTodos.splice(3);
		// let iscompleted = FilteredTodos.every(e => e.completed === true);

		// if (iscompleted) {
		// 	let index = userstore.Users.findIndex(user => user.id == userid);
		// 	console.log(index);
		// 	userstore.Users[index].iscomplete = iscompleted;
		// 	userstore.Users[index].id = userid;
		// }

		this.FilterTodos = FilteredTodos;
	}

	HandleComplete(index) {
		let copyTodos = [...this.FilterTodos];
		copyTodos[index].completed = true;
		this.Todos[index].completed = true;
		this.FilterTodos = copyTodos;
	}

	// CheckCompleted(userid) {
	// 	let iscompleted = filter.every(e => e.completed === true);
	// 	this.taskcompleted.id = userid;
	// 	this.taskcompleted.iscompleted = iscompleted;
	// 	console.log(this.taskcompleted);
	// }
}
const store = new TodoStore();
export default store;
