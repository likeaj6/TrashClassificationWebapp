import React, { Component } from 'react';
import { Segment, Icon, Header, Loader } from 'semantic-ui-react'
// import getUserMedia from 'getusermedia'

class WebCam extends Component {
    constructor(props) {
        super(props);
        this.state = { videoSrc: null}
        this.handleVideo = this.handleVideo.bind(this)
    }
    componentDidMount(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
        }
    }
    handleVideo(stream) {
    // Update the state, triggering the component to re-render with the correct stream
        this.setState({ videoSrc: window.URL.createObjectURL(stream) });
    }
    videoError() {

    }
    render() {
        return <div>
            <video className='camera' src={this.state.videoSrc} autoPlay="true"/>
        </div>;
    }
}

class Livestream extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth < 800, loading: true}
        this.resize = this.resize.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 500)
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth < 800});
    }
    render() {

        const {isMobile, loading, videoSrc} = this.state
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
            </Loader></div>
        } else {
            content = <WebCam/>
        }
        return (
            <div>
                <span />
                <Header as='h2' textAlign='center'>
                    <Icon style={{color:'#b9f4bc'}} name='trash outline'/>
                    Trash detected!
                    Your image is below:
                </Header>
                <Segment>
                    {content}
                </Segment>
            </div>
        )
    }
}

export default Livestream
