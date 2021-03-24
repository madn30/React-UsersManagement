import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import Modall from './Modals';
import GridList from '@material-ui/core/GridList';
import todostore from '../mobx/TodoStore';
import poststore from '../mobx/PostStore';
import usersstore from '../mobx/UsersStore';
import { observer } from 'mobx-react';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',

		backgroundColor: '#9266ff',
	},
	gridList: {
		display: 'flex',
		alignContent: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		paddingLeft: '50px',
		flexDirection: 'column',
	},
	gridListt: {
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'green',
	},
}));
function Users() {
	const classes = useStyles();
	const [modalShow, setModalShow] = React.useState(false);
	const [Index, setIndex] = React.useState(0);

	useEffect(() => {
		usersstore.fetchAllUsers();
	}, []);

	useEffect(() => {
		todostore.fetchAllTodos();
		poststore.fetchAllPosts();
	}, []);
	const otherData = user => {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				Street:
				<input
					defaultValue={user.address.street}
					onChange={e => usersstore.setStreet(e.target.value)}></input>
				City:
				<input
					defaultValue={user.address.city}
					onChange={e => usersstore.setCity(e.target.value)}></input>
				ZipCode:
				<input
					defaultValue={user.address.zipcode}
					onChange={e => usersstore.setZipcode(e.target.value)}></input>
			</div>
		);
	};
	const handleLanguage = bool => {
		setModalShow(bool);
	};
	const DeleteOne = index => {
		let newusers = [...usersstore.Users];
		newusers.splice(index, 1);
		usersstore.UserData(newusers);
	};
	const Update = (index, user) => {
		let id = user.id;
		let name = usersstore.Name ? usersstore.Name : user.name;
		let email = usersstore.Email ? usersstore.Email : user.email;
		let street = usersstore.Street ? usersstore.Street : user.address.street;
		let city = usersstore.City ? usersstore.City : user.address.city;
		let zipcode = usersstore.Zipcode
			? usersstore.Zipcode
			: user.address.zipcode;
		let obj = { id, name, email, address: { street, city, zipcode } };
		let newusers = [...usersstore.Users];
		newusers[index] = obj;

		usersstore.UserData(newusers);
	};
	const HandleAddUser = e => {
		e.preventDefault();
		let StorePostLenght = usersstore.Users.length;
		usersstore.Users.push({
			id: StorePostLenght + 1,
			name: usersstore.Name,
			email: usersstore.Email,
			address: {
				street: '',
				city: '',
				zipCode: '',
			},
		});
		usersstore.showaddcomp = false;
	};

	const AddUser = () => {
		return (
			<div className="UserAddContainer">
				<form id="AddUserForm" onSubmit={HandleAddUser}>
					<label>
						Name:
						<input
							type="text"
							onChange={e => usersstore.setName(e.target.value)}
						/>
						<br />
						Email:
						<input
							type="text"
							onChange={e => usersstore.setEmail(e.target.value)}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	};
	const SearchItem = observer(() => {
		return (
			<div>
				<form id="UserAddAndSearch">
					<label>Search :</label>
					<input onChange={e => usersstore.HandleSearch(e.target.value)} />
					<button
						onClick={() => (usersstore.showaddcomp = !usersstore.showaddcomp)}>
						add
					</button>
				</form>
			</div>
		);
	});

	const ListItem = observer(() => {
		let data = [];
		if (usersstore.SearchResult.length > 0) {
			data = usersstore.SearchResult;
		} else {
			data = usersstore.Users;
		}
		return (
			<div
				className={
					usersstore.showaddcomp ? 'AddCompShowed' : 'ContainerListItem'
				}>
				<GridList cellHeight={100} className={classes.gridList} cols={3}>
					{data.map((user, index) => {
						let iscompleted = usersstore.getuserid(user.id);
						return (
							<div
								key={user.id}
								style={{ display: 'flex', height: 'auto', width: 'auto' }}>
								<GridListTile
									style={{
										border: iscompleted ? '2px solid green' : '2px solid red',
									}}
									className={
										modalShow && index === Index
											? 'Id-Lable-Pressed'
											: 'Id-Lable-NotPressed'
									}
									key={user.id}
									cols={2}>
									<label
										onClick={() => {
											setModalShow(!modalShow);
											setIndex(index);
										}}>
										Id: {user.id}
									</label>
									{modalShow && Index === index && (
										<Modall
											userId={user.id}
											modalShow={true}
											setModalShow={handleLanguage}
										/>
									)}
									<br />
									Name:
									<input
										defaultValue={user.name}
										onChange={e => usersstore.setName(e.target.value)}></input>
									<br />
									Email:
									<input
										defaultValue={user.email}
										onChange={e => usersstore.setEmail(e.target.value)}></input>
									<br />
									<span>
										<MoreHorizIcon
											onClick={() => {
												usersstore.setId(user.id);
												usersstore._SetOtherData(!usersstore.SetOtherData);
											}}
										/>
										<br />
										{usersstore.SetOtherData &&
											usersstore.Id === user.id &&
											otherData(user)}
										<UpdateIcon
											onClick={() => {
												Update(index, user);
											}}
										/>

										<DeleteIcon
											onClick={() => {
												DeleteOne(index);
											}}
										/>
									</span>
									<br />
								</GridListTile>
							</div>
						);
					})}
				</GridList>
			</div>
		);
	});

	return (
		<div className={classes.root}>
			<div className="WrapComp">
				<SearchItem />
				<ListItem />
			</div>
			{usersstore.showaddcomp && <AddUser />}
		</div>
	);
}
export default observer(Users);
