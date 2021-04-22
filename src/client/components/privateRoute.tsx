import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TOKEN_KEY } from '../front-utils/apiService';

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {

    const TOKEN = localStorage.getItem(TOKEN_KEY);

    if (TOKEN) {
        return (
            <Route {...rest}>
                {children}
            </Route>
            
        );
    } else {
        return (
        <Redirect to="/login" />
        )
    }
}

interface PrivateRouteProps {
    children: React.ReactNode;
    exact?: boolean;
    path: string;
}

export default PrivateRoute;

