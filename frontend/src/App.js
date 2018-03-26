import React, { Component } from 'react';
import IntroSteps from './components/IntroSteps'
import HeaderBanner from './components/HeaderBanner'
import Routes from './routes'
import Logo from './assets/logo';
import './App.css';

class App extends Component {

    render() {
        const {history} = this.props
        // console.log(history)
        // console.log(history)
        const path = history.location.pathname
        return (
            <main className='App'>
                <HeaderBanner/>
                <Routes history={history}/>
            </main>
        );
    }
}

export default App;
