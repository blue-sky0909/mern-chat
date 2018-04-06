import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

import * as workspaceActions from '../WorkspaceAction';
import styles from  './Workspace.css';

class CreateWorkspace extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      fullName: "",
      confirmPass: "",
      displayNameError: false,
      passError: false,
      fullNameError: false,
      matchError: false,
      confirmPassError: false,
      userError: false
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
  console.log(nextProps.workspace.data)  
    if(nextProps.workspace.data.success === false) {
      return this._notificationSystem.addNotification({
        message: nextProps.workspace.data.message,
        level: 'error'
      });      
    }
    
    if(nextProps.workspace.data.success === true) {
      this._notificationSystem.addNotification({
        message: 'Create Success',
        level: 'sucess'
      });      
    }
  }

  submit(e) {
    e.preventDefault();
    const { displayName, password, fullName, confirmPass, email } = this.state;

    this.setState({ passError: false })
    this.setState({ userError: false })
    this.setState({ displayNameError: false })
    this.setState({ fullNameError: false })
    this.setState({ confirmPassError: false })
    this.setState({ matchError: false })

    if(fullName == "" ) {
      return this.setState({ fullNameError: true })
    }

    if(displayName == "") {
      return this.setState({ displayNameError: true })
    }

    if(email == "") {
      return this.setState({ userError: true })
    }

    if(password == "") {
      return this.setState({ passError: true })
    }

    if(confirmPass == "") {
      return this.setState({ confirmPassError: true })
    }

    if(password != confirmPass) {
      return this.setState({ matchError: true })
    }

    const data = {
      fullName: fullName,
      displayName: displayName,
      userName: email,
      password: password
    }

    this.props.createWorkspace(data);

  }

  render() {
    const { displayNameError, passError, fullNameError, confirmPassError, matchError, userError } = this.state;

    return (
      <div>
        <Form horizontal className="insideLogInForm" onSubmit={this.submit}>
          <FormGroup controlId="formHorizontalFullName">
            <Row className={styles['custom-row']}>
              <Col sm={4}>
                Full Name
              </Col>
              <Col sm={8}>
                <FormControl
                  type="text" placeholder="Skael Co.,LTD" name="fullName" 
                  className={fullNameError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ fullName: e.target.value})} />
                <span className={fullNameError ? styles['has-error']: styles['no-error']}>
                  Please insert Full Name
                </span>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup controlId="formHorizontalDisplayName">
            <Row className={styles['custom-row']}>
              <Col sm={4}>
                Display Name
              </Col>
              <Col sm={8}>
                <FormControl
                  type="text" placeholder="Maxime" name="displayName" 
                  className={displayNameError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ displayName: e.target.value})} />
                <span className={displayNameError ? styles['has-error']: styles['no-error']}>
                  Please insert Display Name
                </span>
              </Col>
            </Row>
          </FormGroup>

           <FormGroup controlId="formHorizontalAdminUser">
            <Row className={styles['custom-row']}>
              <Col sm={4}>
                Admin User
              </Col>
              <Col sm={8}>
                <FormControl
                  type="email" placeholder="admin@admin.com" name="email" 
                  className={userError ? styles['has-error']: styles['no-error']}
                  onChange={(e) =>this.setState({ email: e.target.value})} />
                <span className={userError ? styles['has-error']: styles['no-error']}>
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
                  Create Workspace <i className="fa fa-arrow-right"/>
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }  
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    workspaceActions: bindActionCreators(workspaceActions, dispatch),
    createWorkspace: (data) => dispatch({type: 'CREATE_WORKSPACE_REQUEST', data: data})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWorkspace);
