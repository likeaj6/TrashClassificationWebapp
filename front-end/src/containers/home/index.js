import React, { Component } from 'react';
import IntroSteps from '../../components/IntroSteps'
import { Loader, Header, Image, Divider } from 'semantic-ui-react'
import logo from '../../logo.svg';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <div class='stripes'>
                    </div>
                <section id='intro'>
                    <img src={logo} className="App-logo" alt="logo" />
                    <Header className="App-title">Welcome to Reflux</Header>
                </section>

                </header>
                <div className="App-intro">
                    <IntroSteps />
                </div>
            </div>
        );
    }
}

export default Home;
