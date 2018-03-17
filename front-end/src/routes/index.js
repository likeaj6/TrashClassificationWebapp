import React from 'react'
import { Route} from 'react-router'

/* containers */
import Home from '../containers/home'

const routes = [
    {
    path: '/',
    exact: true,
    sidebar: () => <div>Home</div>,
    main: () => <Home/>
    },
]

const Routes = () => {
    return (
        <div id="ScrollContainer">
            <div className="App">
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                ))}
            </div>
        </div>
    );
}

export default Routes
