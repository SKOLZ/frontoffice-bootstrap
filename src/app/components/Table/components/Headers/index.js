import React from 'react';
import classNames from 'classnames';
import { bool } from 'prop-types';

import { columnsType, configType } from '~components/Table/propTypes';

import Cell from '~components/Table/components/Cell';

import styles from '~components/Table/styles.module.scss';

function Headers({ config, headers }) {
  const { styles: configStyles = {} } = config;
  return (
    <div className={classNames(configStyles.headers)}>
      {Object.keys(headers).map(columnName => (
        <Cell
          key={`${columnName}-header`}
          className={classNames(
            styles.headerCell,
            configStyles.headerCell,
            `item-${headers[columnName].columnProportion}`
          )}
        >
          {headers[columnName].name}
        </Cell>
      ))}
      <Cell
        key="action-header"
        className={classNames(styles.actionHeader, styles.headerCell, configStyles.headerCell)}
      />
    </div>
  );
}

Headers.propTypes = {
  config: configType,
  hasActions: bool,
  headers: columnsType
};

export default Headers;
