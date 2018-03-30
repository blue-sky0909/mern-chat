import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel, Checkbox } from 'react-bootstrap';

import * as dashboardActions from '../DashboardActions';
import History from '../../../components/History/History';
import Login from '../../Login/pages/Login';
import styles from  './Dashboard.css';

const endpoint = "localhost:8000";
const socket = socketIOClient(endpoint);

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      response: false,
      endpoint: "localhost:8000",
      message: "",
      sendMessage: true
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { message } = this.state;
    this.props.dashboardActions.getMessages();
    this.setState({ token: localStorage.getItem('token') });   
    socket.on("fromMessage", data => {
      this.setState({ response: data });
      this.scrollDown(); 
    });
    this.scrollDown();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ token: localStorage.getItem('token') });
  }

  submit(e) {
    e.preventDefault();
    const { message } = this.state;
    if(message.trim().length > 0) {
      this.setState({ sendMessage: true });
      const data = {
        from_user: JSON.parse(localStorage.getItem('user'))._id,
        to_user: '5ab4bd705dc8207f350ea01c',
        content: message
      }
      socket.send(data);
    }
    this.setState({ message: ""});
    this.setState({ response: false });
    this.scrollDown();

  }

  scrollDown() {
    setTimeout(function() {
      const parent = document.getElementById( "message-history" ); 
      parent.scrollTop = parent.scrollHeight;
    }, 100)
  }

  setMessage(e) {
    this.setState({ sendMessage: false });
    this.setState({ message: e.target.value});
    this.setState({ response: false });
  }

  render() {
    const { token, response, message, sendMessage } = this.state;
    const { dashboard } = this.props;

    if (!token) {
      return <Login history={this.props.history}/>
    } else {
      if(dashboard.isLoaded) {
        return (
          <Panel className={styles.dashboard}>
            <Form horizontal className="insideLogInForm" onSubmit={this.submit}>
              <FormGroup controlId="formHorizontalEmail">
                <History response={response} sendMessage={sendMessage} messages={dashboard.data.messages}/>
                <div className={styles['message-section']}>
                  <FormControl
                    type="text" name="message" value={message}
                    onChange={(e) => this.setMessage(e)} />
                  <Button
                    type="submit"
                    bsStyle="primary"
                    className={styles['btn-send']}
                  >Send Message</Button>
                </div>
              </FormGroup>            
            </Form>
          </Panel>
        );
      } else {
        return null;
      }      
    }
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    dashboard: state.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dashboardActions: bindActionCreators(dashboardActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
