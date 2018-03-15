import React from 'react'
import { render } from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/Store'
import { Provider } from 'react-redux'
import Store, { history } from './store/Store'
import App from './App'
import Routes from './routes'


import './semantic/dist/semantic.min.css';
import './index.css'

const target = document.getElementById('root')
const store = configureStore()

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App history={history}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <NextApp history={history}/>
                </ConnectedRouter>
            </Provider>,
            document.getElementById('root')
        );
    });
    window.store = store;
}

//
//
//
//
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
