import React, { Component } from 'react';
import { Button, Segment, Container, Icon, Header, Divider, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function mapStepsToCard(step, index) {
    const { key, icon, description, actions, title, to, link, style } = step
    // var cardHeight = height == null ? '24rem':height
    // var cardWidth = width == null ? '15rem':width
    var buttons = []
    actions.forEach((action, key) => {
        buttons.push(<Button key={action+key} icon={<Icon name={icon} size='large'/>} attached='bottom' color='teal'/>)
    })
    return (
            <Card
                className='stepCard'
                raised
                as={Link}
                key={key}
                to={to}
                fluid
                color='teal'
                extra={buttons}
                description={<Card.Description textAlign='center' content={<b>{actions[0]}</b>}/>}
                header={<Header className='stepHeader' textAlign='center'>
                {title}<Divider/></Header>}
            />
    );
}

const stepCards = [
    {
        key: 'download',
        icon: 'camera retro',
        title: '1. Scan the trash below the camera',
        style: {
            color: '#4183c5'
        },
        to: '',
        description: '...',
        actions: ['Hold your trash below our camera and sensors!'],
        index: '0'
    },
    {
        key: 'fill',
        icon: 'spinner',
        title: '2. Wait for our algorithms...',
        style: {
            color: '#4183c5'
        },
        to: '',
        description: '...',
        actions: ['We identify and classify your item!'],
        index: '1'
    },
    {
        key: 'add',
        icon: 'undo',
        to: '#',
        title: '3. Tell us how we did!',
        description: '...',
        actions: ['Make a correction and help us improve!'],
        link: true,
        index: '2'
    }
]

// const mapDispatchToProps = dispatch => bindActionCreators({
//      selectedTabItem: (item) => push(item)
// }, dispatch)

class IntroSteps extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth < 800}
        this.resize = this.resize.bind(this)
    }
    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth < 800});
    }
    render() {
        const {isMobile} = this.state
        return (
            <div>
                <span />
                <Header as='h2' textAlign='center'>
                    <Icon style={{color:'#b9f4bc'}} name='recycle'/>
                    How it works:
                </Header>
                <Segment>
                    <Card.Group itemsPerRow={isMobile ? '1':'3'}>
                        {stepCards.map(mapStepsToCard)}
                    </Card.Group>
                </Segment>
            </div>
        )
    }
}

export default IntroSteps
