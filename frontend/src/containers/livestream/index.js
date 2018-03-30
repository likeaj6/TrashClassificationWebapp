import React, { Component } from 'react';
import { Segment, Image, Icon, Header, Grid, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'
import Webcam from 'react-webcam';

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

import {addImage} from '../../actions'

const mapStateToProps = (state) => {
    return {
        image: state.imageObject
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    pictureTaken: (to) => {
        return push('/' + to)
    },
    storeImage: (imageObject) => {
        return addImage(imageObject)
    }
}, dispatch)

class Livestream extends Component {
    static propTypes = {
        imageObject: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            isMobile: window.innerWidth < 800,
            loading: true,
            webcam: null,
            countDown: 4,
        }
        this.resize = this.resize.bind(this)
        this.startCountdown = this.startCountdown.bind(this)
        this.decrementCountdown = this.decrementCountdown.bind(this)
        this.capture = this.capture.bind(this)
        this.pushNextView = this.pushNextView.bind(this)
    }

    startCountdown() {
        setTimeout(() => {
            var handle = setInterval(this.decrementCountdown, 400);
            this.setState({
                loading: false,
                handle: handle
            })
        }, 250)
    }

    decrementCountdown() {
        if (this.state.countDown === 1) {
            this.capture()
            swal({
                titleText: 'Success!',
                position: 'bottom',
                toast: true,
                html:'<b>Picture taken</b>',
                type:'success',
                showConfirmButton: false,
                timer: 1000
            })
            clearInterval(this.state.handle)
        }
        this.setState({
            countDown: this.state.countDown-1
        })
    }

    setRef = (webcam) => {
        this.setState({
            webcam: webcam
        })
    }

    capture() {
        const imageSrc = this.state.webcam.getScreenshot();
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'image': imageSrc
            })
        }
        fetch('https://tricycle-backend.herokuapp.com/client/images/test', request)
        .then(() => {

        })
        this.imageSrc = imageSrc
        setTimeout(() => {
            this.pushNextView()
        }, 1500)
        // console.log(imageSrc)
    };

    pushNextView() {
        const imageObject = this.imageSrc
        this.props.storeImage(imageObject)
        this.props.pictureTaken('feedback')
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth < 800});
    }
    render() {

        const {isMobile, loading, videoSrc, countDown} = this.state
        var countDownText = [3, 2, 1].indexOf(countDown) > -1 ? countDown: countDown == 4 ? 'Ready?' : null
        var countDownTimer = <Header style={{paddingTop: '4rem', fontSize: '5.5rem'}} size="huge">{countDownText}</Header>
        var headerText = [[3, 2, 1].indexOf(countDown) > -1 ? ' Trash detected! Taking your picture...' : 'Your image is below:']
        var content;

        if (countDownText != null) {
            content = <Segment.Group horizontal>
            <Segment>
                <Loader active={loading}>
                </Loader>
                <Webcam audio={false}           screenshotFormat="image/jpeg" ref={this.setRef} height={200} width={ 300} onUserMedia={this.startCountdown}/>
            </Segment>
            <Segment>{countDownTimer}</Segment>
            </Segment.Group>
        } else {
            content = <Segment><Image inline id="trash_image" src={this.imageSrc}/></Segment>
        }
        return (
            <div>
                <span />
                <Header className='introHeader' as='h2' textAlign='center'>
                    <Icon style={{color:'#b9f4bc'}} name='trash outline'/>
                    {headerText}
                </Header>
                {content}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Livestream)
