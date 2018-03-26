import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../Login/LoginActions';
// Import Style
import styles from './Header.css';

class Header extends Component{

  constructor(props) {
    super(props);

    this.state = {
      token: null
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ token: nextProps.login.data.token })
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.loginActions.reset();
    this.props.history.push('/login');
  }

  render() {
    const { token } = this.state;

    return (
      <div className={styles.header}>
        {
          token ?
            <Link onClick={(e) => this.logout(e)}>Log Out</Link>
          : <Link to="/login">Log In</Link>
        }
      </div>
    );
  }
}

Header.propTypes = {
  intl: PropTypes.object.isRequired,
};

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
)(Header);