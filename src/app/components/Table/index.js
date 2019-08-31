import React from 'react';
import classNames from 'classnames';
import { arrayOf, bool, number, string } from 'prop-types';

import Headers from './components/Headers';
import Body from './components/Body';
import styles from './styles.module.scss';
import { bodyType, configType, columnsType, emptyMessageType } from './propTypes';

function Table({ bodies, className, columns, config, error, errorMessage, loading }) {
  const { styles: configStyles = {} } = config;
  return (
    <div className={`${styles.container} ${className} item-1 column`}>
      <Headers config={config} headers={columns} />
      {!loading && !error && (
        <div className={classNames(styles.bodies, configStyles.bodies, 'item-1')}>
          {bodies.map(section => (
            <Body
              columns={columns}
              config={config}
              emptyBodyMessage={section.emptyBodyMessage}
              key={section.key}
              rows={section.rows}
              title={section.title}
            />
          ))}
        </div>
      )}
      {error && errorMessage}
    </div>
  );
}

Table.propTypes = {
  columns: columnsType.isRequired,
  loading: bool.isRequired,
  bodies: arrayOf(bodyType),
  className: string,
  config: configType,
  error: number,
  errorMessage: string
};

Table.defaultProps = {
  bodies: [],
  className: '',
  config: {}
};

export default Table;
