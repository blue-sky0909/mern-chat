import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

import * as registerActions from '../RegisterActions';
import styles from  './Register.css';

class Login extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      confirmPass: "",
      emailError: false,
      passError: false,
      nameError: false,
      matchError: false,
      confirmPassError: false
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.register.data.success === false) {
      this._notificationSystem.addNotification({
        message: nextProps.register.data.message,
        level: 'error'
      });
      return this.props.registerActions.reset();
    } else if(nextProps.register.data.success === true) {
      //this.props.history.push('/dashboard');
      this._notificationSystem.addNotification({
        message: 'Signup Success',
        level: 'success'
      });
      localStorage.setItem('token', nextProps.register.token)
      this.props.registerActions.reset();
    }
  }

  submit(e) {
    e.preventDefault();
    const { email, password, username, confirmPass } = this.state;

    this.setState({ passError: false })
    this.setState({ emailError: false })
    this.setState({ nameError: false })
    this.setState({ confirmPassError: false })
    this.setState({ matchError: false })

    if(username == "" ) {
      return this.setState({ nameError: true })
    }

    if(email == "") {
      return this.setState({ emailError: true })
    }

    if(password == "") {
      return this.setState({ passError: true })
    }

    if(confirmPass == "") {
      return this.setState({ confirmPassError: true })
    }

    if(password != confirmPass) {
      console.log(123)
      return this.setState({ matchError: true })
    }

    this.props.registerActions.register(email, password, username)

  }

  render() {
    const { emailError, passError, nameError, confirmPassError, matchError } = this.state;

    return (
      <Panel className={styles.centerLogInForm}>
        <Form horizontal className="insideLogInForm" onSubmit={this.submit}>
          <FormGroup controlId="formHorizontalUserName">
            <Row className={styles['custom-row']}>
              <Col sm={4}>
                User Name
              </Col>
              <Col sm={8}>
                <FormControl
                  type="text" placeholder="username" name="username" 
                  className={nameError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ username: e.target.value})} />
                <span className={nameError ? styles['has-error']: styles['no-error']}>
                  Please insert User Name
                </span>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Row className={styles['custom-row']}>
              <Col sm={4}>
                Email
              </Col>
              <Col sm={8}>
                <FormControl
                  type="email" placeholder="Email" name="email" 
                  className={emailError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ email: e.target.value})} />
                <span className={emailError ? styles['has-error']: styles['no-error']}>
                  Please insert Email
                </span>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Row className={styles['custom-row']}>
              <Col sm={4}>
                Password
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password" placeholder="Password" name="password"
                  className={passError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ password: e.target.value})} />
                <span className={passError ? styles['has-error']: styles['no-error']}>
                  Please insert Password
                </span>
                <span className={matchError ? styles['has-error']: styles['no-error']}>
                  Dont match Password
                </span>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formHorizontalConPassword">
            <Row className={styles['custom-row']}>
              <Col sm={4}>
                Confirm Password
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password" placeholder="Confirm Password" name="confirmPass"
                  className={confirmPassError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ confirmPass: e.target.value})} />
                <span className={confirmPassError ? styles['has-error']: styles['no-error']}>
                  Please insert Confirm Password
                </span>
                <span className={matchError ? styles['has-error']: styles['no-error']}>
                  Dont match Password
                </span>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={12}>
                <Button type="submit" bsStyle="primary" className={styles['btn-submit']}>
                  Sign Up
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className={styles.signup}>Do you have an account already? <Link to="/login">Sign In</Link></div>
              </Col>
            </Row>
          </FormGroup>
        </Form>
        <NotificationSystem ref="notificationSystem" />
      </Panel>
    );
  }  
}

function mapStateToProps(state) {
  return {
    register: state.register,
    router: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerActions: bindActionCreators(registerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
