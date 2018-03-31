import React, { Component } from 'react';
import { Loader, Segment, Icon, Header, Image, Button } from 'semantic-ui-react'
import Trash from '../../assets/trash'
import Compost from '../../assets/compost'
import Recycle from '../../assets/recycle'
import swal from 'sweetalert2'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
    return {
        image: state.image
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    feedbackReceived: (to) => {
        return push('/' + to)
    },
    errorOccurred: () => {
        return push('/')
    }
}, dispatch)

const backgroundColors = {'trash': '#ffd7a8', 'recycle': '#dbf2ff', 'compost':'#b6ffa6'}

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        };
        this.clearHandles = this.clearHandles.bind(this)
    }

    clearHandles() {
        // alert('clearing handles!!')
        clearInterval(this.state.intervalHandle)
        clearTimeout(this.state.timeoutHandle);
    }

    componentDidMount() {
        var intervalHandle = setInterval(this.awaitAction, 1000);
        var timeoutHandle = setTimeout(() => {
            // alert('TIMING OUT')
            const request = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: this.props.image,
                })
            }
            console.log('Sending image')
            fetch('https://tricycle-backend.herokuapp.com/client/images/test', request)
            .then(() => {
                console.log('Sent image 1')
            })
            console.log('Sent image 2')
            this.clearHandles()
            this.props.errorOccurred('')
        }, 10000)
        this.setState({
            timeoutHandle: timeoutHandle,
            intervalHandle: intervalHandle
        })
        if (this.props.image == null) {
            swal({
                type:'error',
                title: 'Woops!',
                html:'<b>Something has gone wrong!</b>',
                showConfirmButton: false,
                timer: 2000
            }).then((result) => {
                this.clearHandles()
                // alert('TIMING OUT')
                this.props.errorOccurred('')
            })
        }

    }

    awaitAction = () => {
        this.callApi()
            .then(res => {
                console.log(res.userClassification)
                if (res.userClassification) {
                    const request = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            image: this.props.image,
                            classification: res.userClassification
                        })
                    }
                    console.log('Sending image')
                    fetch('https://tricycle-backend.herokuapp.com/client/images/test', request)
                    .then(() => {
                        console.log('Sent image 1')
                    })
                    console.log('Sent image 2')
                    swal({
                        titleText: res.userClassification,
                        imageUrl: 'https://s3.amazonaws.com/classificationwebapp/assets/' + res.userClassification.toLowerCase()+ '.svg',
                        background: backgroundColors[res.userClassification.toLowerCase()],
                        imageWidth: '90rem',
                        imageHeight: '90rem',
                        html: `<b>Thank you for your help!</b>`,
                        type:'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.clearHandles()
                    this.props.feedbackReceived('')
                }
            })
            .catch(err => {
                this.clearHandles()
                console.log(err)
            });
    }

    callApi = async () => {
        const response = await fetch('https://tricycle-backend.herokuapp.com/client/feedback/test');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    buttonPushed = async (buttonPushed) => {
        // console.log(buttonPushed)
        const response = await fetch(`https://tricycle-backend.herokuapp.com/pi/feedback/test?classification=${buttonPushed}`);
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleOnClick = (e, { content }) => {
        // console.log(content)
        this.buttonPushed(content)
            .then(res => {
            })
            .catch(err => console.log(err));
    };

    render() {
        const image = this.props.image
        const imageSegment = image != null ? <Segment><Image inline id="trash_image" src={image}/></Segment> : null
        const headerText = <Header as='h3' textAlign='center'>
            Please press the corresponding button on the trash can!
        </Header>
        const buttons =
        <Button.Group vertical>
            <Button fluid color='brown' icon={<Trash id='trash'/>}content='Trash' onClick={this.handleOnClick}/>
            <Button fluid color='blue' icon={<Recycle id='recycle'/>} content='Recycle' onClick={this.handleOnClick}/>
            <Button fluid color='green' icon={<Compost id='compost'/>} content='Compost' onClick={this.handleOnClick}/>
        </Button.Group>
        const content = <Segment.Group horizontal>
        <Segment>
            {imageSegment}
        </Segment>
        <Segment>{headerText}{buttons}</Segment>
        </Segment.Group>
        return (
            <div className="App-intro">
                <Header className='introHeader' as='h2' textAlign='center'>
                    <Icon style={{color:'#b9f4bc'}} name='trash outline'/>
                    Where should this go?
                </Header>
                {content}

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback)
