import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import _ from 'lodash';

import * as workspaceActions from '../WorkspaceAction';
import styles from  './Workspace.css';

class ListWorkspace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'localhost:8000/'
    }
  }

  componentDidMount() {
    this.props.getWorkspaceList();
  }  

  render() {
    const { workspace } = this.props;
    const { url } = this.state;
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
        </Panel>
      );
    } else {
      return null;
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
    getWorkspaceList: () => dispatch({type: 'FETCH_WORKSPACE_REQUEST'})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWorkspace);
