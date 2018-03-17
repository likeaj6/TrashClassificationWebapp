import React, { Component } from 'react';
import IntroSteps from '../../components/IntroSteps'
import { Loader, Header, Image, Divider } from 'semantic-ui-react'
import Logo from '../../logo';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <div class='stripes'>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                    </div>
                <section id='intro'>
                    <Logo className='logo'/>
                    <Header as='h1' className="App-title">Welcome to Reflux</Header>
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
