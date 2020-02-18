import React, {useState} from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import Modal from 'layout/UI/Modal/Modal';


const App = ({ children }) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(true);
	const err = useSelector(state => state.error);

    const cancelModalHandler = () => {
		dispatch(actions.clearErrors());
		setShowModal(false);
    }

	return (
		<div className={'App'}>
			<Navbar
				color={'light'}
				
				light
			>
				<NavbarBrand tag={Link} to={'/'}>{'Star Wars Client'}</NavbarBrand>
			</Navbar>
			<Modal show={showModal} modalClosed={cancelModalHandler}>{err}</Modal>
			<Container className={'pt-5'}>
				{children}
			</Container>
		</div>
	)
};

export default App;
