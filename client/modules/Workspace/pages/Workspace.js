import React, { PropTypes, Component } from 'react';
import { Panel, Tabs, Tab } from 'react-bootstrap';

import CreateWorkspace from './CreateWorkspace';
import ListWorkspace from './ListWorkspace';
import styles from  './Workspace.css';

export default class Workspace extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      key: 1
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    return (
      <Panel className={styles.centerCreateForm}>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
          animation={false}
        >
          <Tab eventKey={1} title="List Workspace">
            <ListWorkspace/>
          </Tab>
          <Tab eventKey={2} title="Create Workspace">
            <CreateWorkspace/>
          </Tab>
        </Tabs>
      </Panel>
    );
  }  
}

