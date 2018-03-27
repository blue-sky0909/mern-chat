import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel, Checkbox } from 'react-bootstrap';
import Login from '../../Login/pages/Login'
class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      response: false,
      endpoint: "localhost:8000",
      message: ""
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {    
    this.setState({ token: localStorage.getItem('token') });
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ token: localStorage.getItem('token') });
  }

  sendMessage() {
    console.log(123)
    const { endpoint, message } = this.state;
    const socket = socketIOClient(endpoint);
    console.log(message.trim().length)
    if(message.trim().length > 0) {
      const data = {
        user: JSON.parse(localStorage.getItem('user')),
        message: message
      }
      socket.send(data);
    }    
  }

  render() {
    const { token, response } = this.state;
    console.log("response", response)  
    if (!token) {
      return <Login history={this.props.history}/>
    } else {
      return (
        <Panel>
          <h1>This is a dashboard page {response}</h1>
          <Form horizontal className="insideLogInForm" onSubmit={this.submit}>
            <FormGroup controlId="formHorizontalEmail">
              <Row>
                <Col sm={2}>
                  Email
                </Col>
                <Col sm={8}>
                  <FormControl
                    type="text" name="message" value={message}
                    onChange={(e) =>this.setState({ message: e.target.value})} />
                </Col>
              </Row>
            </FormGroup>
            <Button onClick={this.sendMessage} bsStyle="primary"> Send Message </Button>
          </Form>
        </Panel>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

export default connect(
  mapStateToProps,
  null
)(Dashboard);
