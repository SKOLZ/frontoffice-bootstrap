import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';

import icLogout from '~assets/ic_logout.svg';

import styles from './styles.module.scss';

function Navbar({ currentUser = { name: 'Jorge' } }) {
  return (
    <header className={`row middle end ${styles.header}`}>
      <h6 className={`m-right-2 ${styles.userName}`}>Hi {currentUser.name}!</h6>
      <button type="button">
        <ReactSVG
          src={icLogout}
          beforeInjection={svg => {
            svg.classList.add('logout-icon');
          }}
        />
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
