import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

import icLogout from '~assets/ic_logout.svg';
import Icon from '~components/Icon';

function Navbar({ currentUser = { name: 'Jorge' } }) {
  return (
    <header className={`row middle end ${styles.header}`}>
      <h6 className={`m-right-2 ${styles.userName}`}>Hi {currentUser.name}!</h6>
      <button type="button">
        <Icon src={icLogout} classList={['logout-icon']} />
      </button>
    </header>
  );
}

Navbar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string
  })
};

const mapStateToProps = state => ({
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar);
