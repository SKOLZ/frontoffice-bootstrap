import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { t } from 'i18next';

import styles from './styles.module.scss';

import structure from '~constants/structure';
import logo from '~assets/logo-white.png';
import Routes from '~constants/routes';

function Sidebar() {
  return (
    <aside className={styles.sidebarContainer}>
      <Link to={Routes.HOME} className={`${styles.logo} m-top-1 m-bottom-1`}>
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      {structure.models
        .filter(model => !model.only || model.only.INDEX)
        .map(model => (
          <NavLink
            key={model.name}
            to={`/${model.route}`}
            className={styles.modelLink}
            activeClassName={styles.activeModel}
          >
            {t(`${model.name}:model`)}
          </NavLink>
        ))}
    </aside>
  );
}

export default Sidebar;
