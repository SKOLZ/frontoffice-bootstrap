import React from 'react';
import classNames from 'classnames';
import { t } from 'i18next';

import { columnsType, configType } from '~components/Table/propTypes';
import Cell from '~components/Table/components/Cell';
import styles from '~components/Table/styles.module.scss';

function Headers({ config, headers, data }) {
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
          {t(`${data.name}:${headers[columnName].name}_attribute`)}
        </Cell>
      ))}
      {!data.hide_actions && (
        <Cell
          key="action-header"
          className={classNames(styles.actionHeader, styles.headerCell, configStyles.headerCell)}
        >
          {t('Index:actions')}
        </Cell>
      )}
    </div>
  );
}

Headers.propTypes = {
  config: configType,
  headers: columnsType
};

export default Headers;
