import { makeAutoObservable, observable } from 'mobx';
import axios from 'axios';
import todostore from './TodoStore';
class UsersStore {
	Users = [];
	SearchResult = [];
	fetchcomplete = false;
	showaddcomp = false;
	Name = '';
	Email = '';
	Street = '';
	City = '';
	Zipcode = '';
	SetOtherData = false;
	constructor() {
		makeAutoObservable(this, {
			Users: observable,
		});
	}

	fetchAllUsers() {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				this.fetchcomplete = true;
				this.Users = [...response.data];
				this.CopyUsers = [...response.data];
			})
			.catch(err => {
				console.log('in axios ', err);
			});
	}
	_SetOtherData(bool) {
		this.SetOtherData = bool;
	}
	setId(Id) {
		this.Id = Id;
	}
	setName(Name) {
		this.Name = Name;
	}
	setEmail(Email) {
		this.Email = Email;
	}
	setStreet(Street) {
		this.Street = Street;
	}
	setCity(City) {
		this.City = City;
	}
	setZipcode(Zipcode) {
		this.Zipcode = Zipcode;
	}
	UserData(Users) {
		this.Users = Users;
	}
	getuserid(id) {
		let FilteredTodos = todostore.Todos.filter(todo => todo.userId === id);
		FilteredTodos.splice(3);

		let iscompleted = FilteredTodos.every(e => e.completed === true);

		return iscompleted;
	}
	ChangeToSearchFilter(value) {
		this.SearchResult = value;
	}

	HandleSearch(value) {
		console.log(value.toLowerCase());
		let findresult = this.Users.filter(e =>
			e.name.toLowerCase().includes(value.toLowerCase())
		);
		console.log(findresult);
		this.ChangeToSearchFilter(findresult);
	}
}
const store = new UsersStore();
export default store;
