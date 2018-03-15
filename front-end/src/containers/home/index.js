import React, { Component } from 'react';
import { Loader, Button, Segment, Header, Divider, Card, Divider } from 'semantic-ui-react'
import Feed from './feed'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapReimbursementStepsToComponent(step, index) {
    const { key, icon, description, actions, title, link, style } = step
    // var cardHeight = height == null ? '24rem':height
    // var cardWidth = width == null ? '15rem':width
    var buttons = []
    actions.forEach((action, key) => {
        buttons.push(<Button as='a' key={action+key} href={link[key]} attached='bottom' color='red' content={action}/>)
    })
    return (
        <Segment key={key+index}>
            <Card
                className='StepCards'
                raised
                fluid={window.innerWidth <= 1000}
                color='red'
                extra={buttons}
                description={<Card.Description textAlign='center' content={description}/>}
                header={<Header textAlign='center'>{title}<Divider/></Header>}
            />
        </Segment>
    );
}

const ReimbursementSteps = [
    {
        key: 'download',
        icon: 'users',
        title: '1. Download Form',
        style: {
            color: '#4183c5'
        },
        description: 'Download the general payment form below.',
        actions: ['Download Form'],
        link: [links.reimbursementForm],
        index: '0'
    },
    {
        key: 'fill',
        icon: 'address card outline',
        title: '2. Fill out the form',
        style: {
            color: '#4183c5'
        },
        description: 'Use the Subcodes and Club & Organization Numbers linked below.',
        actions: ['Subcodes', 'Club & Org Numbers'],
        to: '/resources/chartering',
        link: [links.subCodes, links.clubNumbers],
        index: '1'
    },
    {
        key: 'add',
        icon: 'sitemap',
        title: '3. Add your receipts',
        description: 'Please make sure to have your form and receipts put into a single PDF file. The first page of the PDF file should always be the reimbursement form.',
        actions: [],
        link: true,
        index: '2'
    },
    {
        key: 'format',
        icon: 'dollar',
        title: '4. Format your form',
        to: '/resources/funding',
        description: 'Title your PDF file in the following format: "[the name of whom were to receive the reimbursed amount] ([your student group\'s name])". For example, "John_Doe(SBC)".',
        style: {
            color: '#4183c5'
        },
        actions: [],
        link: true,
        index: '3'
    },
    {
        key: 'send',
        icon: 'currency',
        title: '5. Send It!',
        style: {
            color: '#4183c5'
        },
        to: '/resources/sbc',
        actions: [],
        description: 'Send that single PDF file, which contains both the form and receipts, to SBC Office via email swarthmoresbc@gmail.com.',
        link: true,
        index: '4'
    },
]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        fetch('/')
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 10)
        //   .then(res => res.json())
        //   .then(users => this.setState({ users }));
    }

    render() {
        const {loading} = this.state
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Image size="medium" src={logo}/>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            // content = <Feed/>;
        }
        return (
            <div>
                <div className="App-header">
                    <Header textAlign='center' size='huge'>Dashboard</Header>
                    <Divider/>
                </div>
                <div className="App-intro" style={{marginTop:'3%', marginBottom:'5%'}}>
                    {content}
                </div>
            </div>
        );
    }
}

export default Home
