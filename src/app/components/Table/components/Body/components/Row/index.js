import React from 'react';
import classNames from 'classnames';
import { any, string, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { actionCreators as modalActions } from '~redux/modal/actions';
import { actionType, columnsType, configType } from '~components/Table/propTypes';
import Cell from '~components/Table/components/Cell';
import Icon from '~components/Icon';
import Trash from '~assets/trash.svg';
import Edit from '~assets/edit.svg';
import styles from '~components/Table/styles.module.scss';

function ActionComponent({ dispatch, ...props }) {
  const handleDelete = () => dispatch(modalActions.toggleDeleteModal(props.row.id));
  return (
    <div className="row">
      <Link
        to={`${window.location.pathname}/${props.row.id}/edit`}
        className={`button-primary ${styles.iconButton} m-right-2`}
      >
        <img className={styles.actionIcon} src={Edit} alt="edit" />
      </Link>
      <button onClick={handleDelete} type="button" className={`button-secondary ${styles.iconButton}`}>
        <Icon src={Trash} classList={[styles.actionIcon, 'trash-ic']} />
      </button>
    </div>
  );
}

const ConnectedActionComponent = connect()(ActionComponent);

function Row({ action, config, columns, data, url, showActions }) {
  const { styles: configStyles = {} } = config;
  return (
    <div className={classNames(styles.rowContainer, configStyles.rowContainer)}>
      {Object.keys(columns).map((columnName, index) => {
        const { component: CellComponent, format: dataParser } = columns[columnName] || {};
        const cellData = dataParser?.(data[columnName]) || data[columnName] || null;
        return cellData ? (
          <Cell
            key={`${data.id}-${columnName}`}
            className={classNames(
              styles.cell,
              configStyles.cell,
              `item-${columns[columnName].columnProportion}`
            )}
          >
            {index
              ? CellComponent ? (
                <CellComponent {...cellData} />
              ) : (
                cellData
              )
             : (
              <Link to={url} className={classNames(styles.rowLink, configStyles.rowLink)}>
                 {CellComponent ? <CellComponent {...cellData} /> : cellData}
               </Link>
            )}
          </Cell>
        ) : null;
      })}
      {showActions && (
        <Cell
          key={`${data.id}-actions`}
          className={classNames(styles.cell, configStyles.cell, styles.actionCell)}
        >
          <ConnectedActionComponent row={data} />
        </Cell>
      )}
    </div>
  );
}

Row.propTypes = {
  action: actionType,
  columns: columnsType,
  config: configType,
  // eslint-disable-next-line react/forbid-prop-types
  data: any,
  showActions: bool,
  url: string
};

Row.defaultProps = {
  action: {},
  config: {},
  url: ''
};

export default Row;
