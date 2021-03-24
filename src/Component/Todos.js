import React, { useEffect } from 'react';
import store from '../mobx/TodoStore';
import { observer } from 'mobx-react';
function Todos(props) {
	useEffect(() => {
		store._FilterTodos(props.userid);
	}, []);

	const HandleAddTodo = e => {
		e.preventDefault();
		let StoreTodoLenght = store.FilterTodos.length;

		store.FilterTodos.push({
			id: StoreTodoLenght + 1,
			title: store.NewTodoTitle,
			completed: false,
			userId: props.userid,
		});
		store.ShowAddComp = false;
	};
	const AddTodo = () => {
		return (
			<div className="TodoPost">
				<form id="AddTodoForm" onSubmit={HandleAddTodo}>
					<label>
						Name:
						<input
							type="text"
							onChange={e => (store.NewTodoTitle = e.target.value)}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	};
	return (
		<div className="TodoContainer">
			<button
				className="AddButton"
				onClick={() => (store.ShowAddComp = !store.ShowAddComp)}>
				Add
			</button>
			{store.ShowAddComp ? (
				<AddTodo />
			) : (
				<div className="BodyTodo">
					{store.FilterTodos.map((todo, index) => {
						return (
							<div key={todo.id}>
								<ul>
									<li>{todo.title}</li>
									{!todo.completed && (
										<button
											onClick={() => {
												store.HandleComplete(index);
											}}>
											mark complete
										</button>
									)}
								</ul>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default observer(Todos);
