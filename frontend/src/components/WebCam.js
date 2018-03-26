import React, { Component } from 'react';
import { Segment, Image, Icon, Header, Grid, Loader } from 'semantic-ui-react'

class WebCam extends Component {
    constructor(props) {
        super(props);
        this.state = { videoSrc: null, stream: null, canvas: null}
        this.handleVideo = this.handleVideo.bind(this)
        this.stopStream = this.stopStream.bind(this)
    }
    componentDidMount(){
        navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true })
            .then(this.handleVideo)
            .catch(this.videoEror);
        }
        else {
            navigator.getWebcam({video: true }, this.handleVideo, this.videoError)
        }
        // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        // if (navigator.getUserMedia) {
        //     navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
        // }
    }

    handleVideo(stream) {
    // Update the state, triggering the component to re-render with the correct stream
        this.setState({
            videoSrc: window.URL.createObjectURL(stream),
            stream: stream
        });
    }

    videoError(e) {
        console.log(e.name + ": " + e.message);
    }

    stopStream(stream) {
        console.log(this.state.stream)
        if (stream != null) {
            stream.getTracks().forEach(track => track.stop())
        }
    }

    render() {
        if (this.props.freeze != null) {
            this.stopStream(this.state.stream)
        }
        return <div>
            <video id='camera' src={this.state.videoSrc} autoPlay="true"/>
        </div>;
    }
}
