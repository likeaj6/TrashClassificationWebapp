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

const backgroundColors = {'trash': '#fff4e7', 'recycle': '#dbf2ff', 'compost':'#ecfee8'}

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        };
    }

    componentDidMount() {
        var handle = setInterval(this.awaitAction, 1000);
        this.setState({
            handle: handle
        })
        if (this.props.image == null) {
            swal({
                type:'error',
                title: 'Woops!',
                html:'<b>Something has gone wrong!</b>',
                showConfirmButton: false,
                timer: 2000
            }).then((result) => {
                this.props.errorOccurred('')
            })
        }
        setTimeout(() => {
            clearInterval(this.state.handle)
            this.props.feedbackReceived('')
        }, 10000)
    }

    awaitAction = () => {
        this.callApi()
            .then(res => {
                // console.log(res.userClassification)
                if (res.userClassification) {
                    swal({
                        titleText: res.userClassification,
                        imageUrl: 'https://s3.amazonaws.com/classificationwebapp/assets/' + res.userClassification.toLowerCase()+ '.svg',
                        background: backgroundColors[res.userClassification.toLowerCase()],
                        imageWidth: '90rem',
                        imageHeight: '90rem',
                        html: `<b>Thank you for your help!</b>`,
                        type:'success',
                        showConfirmButton: false,
                        timer: 10000
                    })
                    clearInterval(this.state.handle)
                    this.props.feedbackReceived('')
                }
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/client/feedback/test');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    buttonPushed = async (buttonPushed) => {
        // console.log(buttonPushed)
        const response = await fetch(`/pi/feedback/test?classifiction=${buttonPushed}`);
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
        const content = image != null ? <Segment><Image inline id="trash_image" src={image}/></Segment> : null
        return (
            <div className="App-intro">
                <Header className='introHeader' as='h2' textAlign='center'>
                    <Icon style={{color:'#b9f4bc'}} name='trash outline'/>
                    Where should this go?
                </Header>
                {content}
                <Header as='h3' textAlign='center'>
                    Please press the corresponding button!
                </Header>
                <Trash id='trash'/>
                <Button content='Trash' onClick={this.handleOnClick}/>
                <Recycle id='recycle'/>
                <Button content='Recycle' onClick={this.handleOnClick}/>
                <Compost id='compost'/>
                <Button content='Compost' onClick={this.handleOnClick}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback)
