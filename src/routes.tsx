import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Pets from './pages/pets';

import { userIsAuthenticated } from './services/auth';

type TParams = {
	component?: React.FunctionComponent<RouteComponentProps> | React.ComponentClass<RouteComponentProps> | any;
	path: string;
};

const PrivateRoute = ({ component: Component, ...rest }: TParams) => (
	<Route
		{...rest}
		render={props =>
			userIsAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/', state: { from: props.location } }} />
			)
		}
	/>
);

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={SignIn} />
			<Route path='/signup' component={SignUp} />
			<PrivateRoute path='/pets' component={Pets} />
			<Route path='*' component={() => <h1>Page not Found</h1>} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
