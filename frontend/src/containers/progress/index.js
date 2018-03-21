import React, { Component } from 'react';
import { Button, Segment, Container, Progress, Icon, Header, Divider, Loader, Card } from 'semantic-ui-react'

const steps = [
    {icon: 'crop', text: 'Preprocessing image for machine learning...'},
    {icon: 'spinner', text: 'Running image through neural network...'},
    {icon: 'object group', text: 'Identifying item...'},
    {icon: 'list layout', text: 'Categorizing item...'},
    {icon: 'checkmark', text: 'Finishing up...'},
]

class ClassificationProgress extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth < 800, loading: true, percent: 0, handle: 0}
        this.resize = this.resize.bind(this)
        this.incrementProgress = this.incrementProgress.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 500)
        this.resize();
        var handle = setInterval(this.incrementProgress, 2000);
        this.setState({
            handle: handle
        })
    }

    incrementProgress() {
        if (this.state.percent == 100) {
            clearInterval(this.state.handle)
        } else {
            this.setState({
                percent: this.state.percent+25
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth < 800});
    }
    render() {

        const {isMobile, loading, videoSrc, percent} = this.state
        var currentStep = steps[(percent/25)]
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
            </Loader></div>
        }
        return (
            <div>
                <span />
                <Header as='h2' textAlign='center'>
                    <Icon style={{color:'#b9f4bc'}} name='wizard'/>
                    Running our algorithms on the image!
                </Header>
                <Segment>
                    <Progress size='large' indicating active percent={percent}>
                        <Icon size='large' name={currentStep.icon}/>
                        {currentStep.text}
                    </Progress>
                </Segment>
            </div>
        )
    }
}

export default ClassificationProgress
