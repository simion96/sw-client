import classnames from 'classnames';
import sentenceCase from 'sentence-case';
import * as actions from '../store/actions';
import {
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableView from './TableView/TableView';
import Loading from '../layout/UI/Loading/Loading';

const Home = () => {
	const dispatch = useDispatch();
	const [tab, setTab] = useState(void 0);
	const [favouritesActive, setFavouritesActive] = useState(false);
	const roots = useSelector(state => state.roots);
	const loading = useSelector(state => state.loading);

	useEffect(() => {
		dispatch(actions.getRoots());
	}, [dispatch]);

	const keys = Object.keys(roots || {});

	return (
		<div>
			<h1>{'My little Star Wars app 👾'}</h1>
			<button onClick={()=> setFavouritesActive(!favouritesActive)} style={{float: 'right'}}>
					Toggle Favourites
			</button>
			{loading ? <Loading isLoading={loading} /> : null}
			{keys  && (
				<div className={'mt-3'}>
					<Nav tabs>
						{keys.map(k => (
							<NavItem key={k}>
								<NavLink
									className={classnames({ active: tab === k })}
									onClick={() => setTab(k)}
								>
									{sentenceCase(k)}
								</NavLink>
							</NavItem>
						))}
					</Nav>

					<TabContent activeTab={tab}>
						{keys.map(k => (
							<TabPane
								key={k}
								tabId={k}
							>
								<TableView resourceType={k} favouritesActive={favouritesActive}></TableView>
							</TabPane>
						))}
					</TabContent>
				</div>
			)}
		</div>
	);
};

export default Home;
