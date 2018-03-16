import React, { Component } from 'react';
import IntroSteps from './components/IntroSteps'
import Routes from './routes'
import logo from './logo.svg';
import './App.css';

class App extends Component {

    render() {
        const {history} = this.props
        // console.log(history)
        const path = history.location.pathname
        return (
            <main>
                <Routes/>
            </main>
        );
    }
}

export default App;
