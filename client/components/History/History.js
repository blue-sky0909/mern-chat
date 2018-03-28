import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel, Checkbox } from 'react-bootstrap';
import _ from 'lodash';

import styles from './History.css';

export default class History extends Component {

    constructor(props) {
        super(props)

        this.state = {
            histories: [],
            user: {}
        }
    }

    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });
    }

    componentDidMount() {
        const { response } = this.props;
        let { histories } = this.state;
        if(response.response !== false && !_.isNil(response.response)) {
            histories.push(response);
            this.setState({ histories });           
        }
    }

    componentWillReceiveProps(nextProps) {
        let { histories } = this.state;
        if(nextProps.response !== false) {
            histories.push(nextProps);
            this.setState({ histories });
        }       
    }

    render() { 
        const { response } = this.props;
        const { histories, user } = this.state;
console.log(histories)
        return(
            <div>
                {
                    _.map(histories, (history, index) => {
                        return (
                            <div key={index} className={history.response.from_user === user._id? styles['send-message']: styles['receive-message']}>
                                {history.response && history.response.content}
                            </div>
                       )
                    })
                }
            </div>
        )
    }
}
