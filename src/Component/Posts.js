import React, { useEffect } from 'react';
import store from '../mobx/PostStore';
import { observer } from 'mobx-react';
function Posts(props) {
	useEffect(() => {
		store._FilterPost(props.userid);
	}, []);
	const HandleAddPost = e => {
		e.preventDefault();
		let StorePostLenght = store.FilteredPost.length;

		store.FilteredPost.push({
			id: StorePostLenght + 1,
			title: store.NewPostTitle,
			body: store.NewPostBody,
			userId: props.userid,
		});
		store.ShowAddComp = false;
	};
	const AddPost = () => {
		return (
			<div className="AddContainer">
				<form id="AddPostForm" onSubmit={HandleAddPost}>
					<label>
						Title:
						<input
							type="text"
							onChange={e => (store.NewPostTitle = e.target.value)}
						/>
						Body:
						<input
							type="text"
							onChange={e => (store.NewPostBody = e.target.value)}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	};
	return (
		<div className="PostContainer">
			<button onClick={() => (store.ShowAddComp = !store.ShowAddComp)}>
				Add
			</button>
			{store.ShowAddComp ? (
				<AddPost />
			) : (
				<div className="BodyPost">
					{store.FilteredPost.map((post, index) => {
						return (
							<div key={post.id}>
								<ul>
									<li>Title: {post.title}</li>
									<br />
									<li>Body : {post.body}</li>
								</ul>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default observer(Posts);
