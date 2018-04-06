import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel, Checkbox } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

import * as loginActions from '../LoginActions';
import styles from  './Login.css';

class Login extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: false,
      passError: false,
      remember: false
    };

    this.submit = this.submit.bind(this);
    this.remember = this.remember.bind(this);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    const remember = localStorage.getItem('remember');
    const user = JSON.parse(localStorage.getItem('user'))

    if(remember) {
      this.setState({ remember: remember });
      this.setState({ email: user.email });
      this.setState({ password: user.password });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.login.data.success === false) {
      this._notificationSystem.addNotification({
        message: nextProps.login.data.message,
        level: 'error'
      });
      return this.props.loginActions.reset();
    } else if(nextProps.login.data.success === true) {
      localStorage.setItem('token', nextProps.login.data.token);
      localStorage.setItem('user', JSON.stringify(nextProps.login.data.user));
      localStorage.setItem('remember', this.state.remember);
      this.props.history.push('/');      
    }
  }

  remember() {
    this.setState({ remember: !this.state.remember});
  }

  submit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({ passError: false });
    this.setState({ emailError: false });
    if(email === "" && password === "") {
      this.setState({ passError: true });
      return this.setState({ emailError: true });
    }
    if(email == "") {
      return this.setState({ emailError: true });
    }

    if(password == "") {
      return this.setState({ passError: true });
    }

    this.props.loginActions.login(email, password);
  }

  render() {
    const { emailError, passError, email, password, remember } = this.state;

    return (
      <Panel className={styles.centerLogInForm}>
        <Form horizontal className="insideLogInForm" onSubmit={this.submit}>
          <FormGroup controlId="formHorizontalEmail">
            <Row className={styles['custom-row']}>
              <Col sm={2}>
                Email
              </Col>
              <Col sm={8}>
                <FormControl
                  type="email" placeholder="Email" name="email" value={email}
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
              <Col sm={2}>
                Password
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password" placeholder="Password" name="password" value={password}
                  className={passError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ password: e.target.value})} />
                <span className={passError ? styles['has-error']: styles['no-error']}>
                  Please insert Password
                </span>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox onChange={this.remember} checked={remember}>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col sm={12}>
                <Button type="submit" bsStyle="primary" className={styles['btn-submit']}>
                  Sign In
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className={styles.signup}>Dont you have an account? <Link to="/register">Sign up</Link></div>
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
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
