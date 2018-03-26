import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import Login from '../../Login/pages/Login'
class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      response: false,
      endpoint: "localhost:8000"
    }
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

  render() {
    const { token, response } = this.state;
console.log("response", response)  
    if (!token) {
      return <Login history={this.props.history}/>
    } else {
      return (
        <h1>This is a dashboard page {response}</h1>
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
