import React, { Component } from 'react';
import IntroSteps from '../../components/IntroSteps'
import { Loader, Header, Image, Divider, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'


const mapDispatchToProps = dispatch => bindActionCreators({
    objectDetected: (to) => {
        return push('/' + to)
    }
}, dispatch)

class Home extends Component {
    state = {
        response: ''
    };

    componentDidMount() {
        var handle = setInterval(this.awaitAction, 1000);
        this.setState({
            handle: handle
        })
    }

    awaitAction = () => {
        this.callApi()
            .then(res => {
                console.log(res.detected)
                if (res.detected) {
                    this.props.objectDetected('stream')
                    clearInterval(this.state.handle)
                }
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('https://tricycle-backend.herokuapp.com/client/standby/test');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    motionDetected = async () => {
        const response = await fetch('https://tricycle-backend.herokuapp.com/pi/detected/test');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleOnClick = () => {
        this.motionDetected()
            .then(res => {
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="App-intro">
                <IntroSteps />
                <Button content='Motion Detected!' onClick={this.handleOnClick}/>
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Home)
