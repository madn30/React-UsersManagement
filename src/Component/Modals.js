import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '@material-ui/core/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';

import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalBody from 'react-bootstrap/ModalBody';
import Todos from '../Component/Todos';
import Post from '../Component/Posts';
function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			className="TodoAndPostContainer rounded-0"
			aria-labelledby="contained-modal-title-vcenter"
			{...props}
			size="lg">
			<div
				style={{
					outline: 'none',
					width: '50%',
					marginLeft: '25%',
				}}>
				<ModalHeader className="ReactModal__Head">
					<Button onClick={props.onClose}>X</Button>
				</ModalHeader>
				<ModalBody className="ReactModal__Body">
					<h4>Todos</h4>
					<br />

					<Todos userid={props.userid} />
					<h4>Posts</h4>
					<Post userid={props.userid} />
				</ModalBody>
			</div>
		</Modal>
	);
}
export default function Modall(props) {
	return (
		<MyVerticallyCenteredModal
			open={props.modalShow}
			onClose={() => {
				props.setModalShow(false);
			}}
			userid={props.userId}
		/>
	);
}
