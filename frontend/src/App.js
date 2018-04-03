import React, { Component } from 'react';
import IntroSteps from './components/IntroSteps'
import HeaderBanner from './components/HeaderBanner'
import Routes from './routes'
import Logo from './assets/logo';
import './App.css';

import { connect } from 'react-redux'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCount: null
        };
        this.updateDataCount = this.updateDataCount.bind(this)
    }

    componentDidMount() {
        var handle = setInterval(this.awaitAction, 1000);
    }

    awaitAction = () => {
        this.callApi()
            .then(res => {
                this.updateDataCount(res.dataCount)
            })
            .catch(err => console.log(err));
    }

    updateDataCount = (dataCount) => {
        this.setState({
            dataCount: dataCount
        })
    }

    callApi = async () => {
        const response = await fetch('https://tricycle-backend.herokuapp.com/client/datacount/test');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        const {history} = this.props
        const {dataCount} = this.state
        var count = dataCount != null ? dataCount:'N/A'
        // console.log(history)
        // console.log(history)
        const path = history.location.pathname
        return (
            <main className='App'>
                <div id='counter'># of Trash Scanned: {count}</div>
                <HeaderBanner/>
                <Routes history={history}/>
            </main>
        );
    }
}

export default App
