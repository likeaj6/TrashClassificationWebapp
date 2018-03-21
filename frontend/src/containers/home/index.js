import React, { Component } from 'react';
import IntroSteps from '../../components/IntroSteps'
import { Loader, Header, Image, Divider } from 'semantic-ui-react'
import Logo from '../../logo';

class Home extends Component {

    render() {
        return (
            <div className="App-intro">
                <IntroSteps />
            </div>
        );
    }
}

export default Home;
