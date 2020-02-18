import App from './components/App';
import Home from './components/Home';
import ResourceDisplay from './components/ResourceDisplay/ResourceDisplay';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
//import createStore from './store';
import {store} from './store';
import { Route, Switch } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from "history";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
	}
`;

const browserHistory = createBrowserHistory();


const routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<GlobalStyle />
			<App>
				<Switch>
					<Route
						component={Home}
						exact
						path={'/'}
					/>
					<Route
						path={['/people/:id', '/starships/:id', '/vehicles/:id', '/species/:id', '/films/:id', '/planets/:id']}
						exact
						component={ResourceDisplay}
						
					/>
				</Switch>
			</App>
		</Router>
	</Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
