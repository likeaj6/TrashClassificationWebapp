import React from 'react';
import {render} from 'react-dom'
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/Store'
import App from './App';
import { Provider } from 'react-redux'
import { history } from './store/Store'

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';


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
    console.log(store.getState())
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

registerServiceWorker();
