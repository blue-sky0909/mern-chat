import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel, Checkbox } from 'react-bootstrap';

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
      message: ""
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {    
    this.setState({ token: localStorage.getItem('token') });   
    socket.on("fromMessage", data => {
      this.setState({ response: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ token: localStorage.getItem('token') });
  }

  submit(e) {
    e.preventDefault();
    const { message } = this.state;
    if(message.trim().length > 0) {
      const data = {
        from_user: JSON.parse(localStorage.getItem('user'))._id,
        to_user: '5ab4bd705dc8207f350ea01c',
        content: message
      }
      socket.send(data);
    }    
  }

  render() {
    const { token, response, message } = this.state;

    if (!token) {
      return <Login history={this.props.history}/>
    } else {
      return (
        <Panel className={styles.dashboard}>
          <Form horizontal className="insideLogInForm" onSubmit={this.submit}>
            <FormGroup controlId="formHorizontalEmail">
              <History response={response} />
              <div className={styles['message-section']}>
                <FormControl
                  type="text" name="message" value={message}
                  onChange={(e) =>this.setState({ message: e.target.value})} />
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
