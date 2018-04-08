import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Panel, Form, FormGroup, FormControl, Row, Col, Button } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import _ from 'lodash';

import * as workspaceActions from '../WorkspaceAction';
import styles from  './Workspace.css';

class ListWorkspace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'localhost:8000/',
      email: "",
      emailError: false,
    }

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this._notificationmessage = this.refs.notificationmessage;
    console.log(this._notificationmessage)
    this.props.getWorkspaceList();    
  }

  componentWillReceiveProps(nextProps) {
    console.log(this._notificationmessage)
    if(nextProps.workspace.mailInfo && nextProps.workspace.mailInfo.success === true)
      return this._notificationmessage.addNotification({
        message: nextProps.workspace.mailInfo.message,
        level: 'success'
      });
    else if (nextProps.workspace.mailInfo && nextProps.workspace.mailInfo.success === false){
      this._notificationmessage.addNotification({
        message: 'Not found',
        level: 'error'
      });
    }
  }

  submit(e) {
    e.preventDefault();
    const { email } = this.state;
    this.setState({ emailError: false });

    if(email == "") {
      return this.setState({ emailError: true });
    }

    this.props.sendConfirm(email);
  } 

  render() {
    const { workspace } = this.props;
    const { url, email, emailError } = this.state;
    if (workspace.isLoaded) {      
      return (
        <Panel>
          <ListGroup>
          {
            _.map(workspace.workspaces, (workspace, index) => {
              const link = 'login/' + workspace.displayname;
              const name = url + workspace.displayname;
              return(
                <ListGroupItem key={index} className={styles.list}>{workspace.fullname}
                  <Link to={link}>{name}</Link>
                </ListGroupItem>
              )
            })
          }            
          </ListGroup>
          <Form horizontal className="insideLogInForm" onSubmit={this.submit}>
              <Row className={styles['custom-row']}>
                <Col sm={9}>
                  <FormControl
                    type="email" placeholder="Email" name="email" value={email}
                    className={emailError ? styles['has-error']: styles['no-error']}
                    onChange={(e) =>this.setState({ email: e.target.value})} />
                  <span className={emailError ? styles['has-error']: styles['no-error']}>
                    Please insert Email
                  </span>
                </Col>
                <Col sm={3}>
                  <Button type="submit" bsStyle="primary" className={styles['btn-submit']}>
                    Confirm
                  </Button>
                </Col>
              </Row>
          </Form>
          <NotificationSystem ref="notificationmessage" />          
        </Panel>
      );
    } else {
      return <NotificationSystem ref="notificationmessage" />;
    }
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    workspaceActions: bindActionCreators(workspaceActions, dispatch),
    getWorkspaceList: () => dispatch({type: 'FETCH_WORKSPACE_REQUEST'}),
    sendConfirm: (email) => dispatch({type: 'CREATE_CONFIRM_REQUEST', email: email})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWorkspace);
