import React from 'react'
import { Route, Link, Redirect } from 'react-router'

/* containers */
import Home from 'containers/home'

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <Home/>
  },
  // { path: '/shoelaces',
  //   sidebar: () => <div>shoelaces!</div>,
  //   main: () => <h2>Shoelaces</h2>
  // }
]

const Routes = () => {
    return (
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
    );
}

export default Routes
