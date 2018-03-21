import React from 'react'
import { Route} from 'react-router'

/* containers */
import Home from '../containers/home'
import Livestream from '../containers/livestream'
import ClassificationProgress from '../containers/progress'

const routes = [
    {
    path: '/',
    exact: true,
    sidebar: () => <div>Home</div>,
    main: () => <Home/>
    },
    {
    path: '/stream',
    exact: true,
    sidebar: () => <div>Stream</div>,
    main: () => <Livestream/>
    },
    {
    path: '/progress',
    exact: true,
    sidebar: () => <div>Progress</div>,
    main: () => <ClassificationProgress/>
    },
]

const Routes = () => {
    return (
        <div id="ScrollContainer">
            <div className="App-content">
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
