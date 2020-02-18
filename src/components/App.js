import React from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import {Link} from 'react-router-dom';

const App = ({ children }) => (
	<div className={'App'}>
		<Navbar
			color={'light'}
			
			light
		>
			<NavbarBrand tag={Link} to={'/'}>{'Star Wars Client'}</NavbarBrand>
		</Navbar>

		<Container className={'pt-5'}>
			{children}
		</Container>
	</div>
);

export default App;
