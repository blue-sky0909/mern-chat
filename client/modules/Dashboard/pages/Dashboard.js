import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import Login from '../../Login/pages/Login'
class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null
    }
  }

  componentDidMount() {    
    this.setState({ token: localStorage.getItem('token') })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ token: localStorage.getItem('token') })
  }

  render() {
    const { token } = this.state;
  
    if (!token) {
      return <Login history={this.props.history}/>
    } else {
      return (
        <h1>This is a dashboard page</h1>
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
