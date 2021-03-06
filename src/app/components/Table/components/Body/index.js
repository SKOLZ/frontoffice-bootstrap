import React from 'react';
import classNames from 'classnames';
import { arrayOf, string } from 'prop-types';

import { columnsType, configType, emptyMessageType, rowType } from '~components/Table/propTypes';

import styles from '~components/Table/styles.module.scss';

import Row from './components/Row';

function Body({ columns, config, title, rows, emptyBodyMessage }) {
  const { styles: configStyles = {} } = config;

  return (
    <div className={classNames(styles.bodyContent, configStyles.bodyContent)}>
      {title && <h4 className={classNames('full-width', styles.title, configStyles.title)}>{title}</h4>}
      <div className={classNames(styles.rows, configStyles.rows)}>
        {!!rows.length &&
          rows.map(row => (
            <Row
              action={row.action}
              columns={columns}
              config={row.config}
              data={row.data}
              key={`row-${row.id}`}
              url={row.url}
            />
          ))}
        {!rows.length && emptyBodyMessage}
      </div>
    </div>
  );
}

Body.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  columns: columnsType,
  config: configType,
  emptyBodyMessage: string,
  rows: arrayOf(rowType),
  title: string
};

Body.defaultProps = {
  rows: [],
  title: ''
};

export default Body;
