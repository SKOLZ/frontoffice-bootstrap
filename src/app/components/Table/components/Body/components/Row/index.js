import React, { Component } from 'react';
import classNames from 'classnames';
import { any, string } from 'prop-types';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';

import { actionCreators as modalActions } from '~redux/modal/actions';

import { actionType, columnsType, configType } from '~components/Table/propTypes';

import Cell from '~components/Table/components/Cell';

import Trash from '~assets/trash.svg';

import Edit from '~assets/edit.svg';

import styles from '~components/Table/styles.module.scss';

class ActionComponent extends Component {
  handleDelete = () => {
    this.props.dispatch(modalActions.toggleDeleteModal(this.props.row.id));
  };

  render() {
    const { props } = this;
    return (
      <div className="row">
        <Link
          to={`${window.location.pathname}/${props.row.id}/edit`}
          className={`button-primary ${styles.iconButton} m-right-2`}
        >
          <img className={styles.actionIcon} src={Edit} alt="edit" />
        </Link>
        <button onClick={this.handleDelete} type="button" className={`button-secondary ${styles.iconButton}`}>
          <ReactSVG
            src={Trash}
            alt="delete"
            beforeInjection={svg => {
              svg.classList.add(styles.actionIcon);
              svg.classList.add('trash-ic');
            }}
          />
        </button>
      </div>
    );
  }
}

const ConnectedActionComponent = connect()(ActionComponent);

function Row({ action, config, columns, data, url }) {
  const { props: actionComponentProps } = action;
  const { styles: configStyles = {} } = config;
  return (
    <div className={classNames(styles.rowContainer, configStyles.rowContainer)}>
      <Link
        to={url}
        className={classNames('middle', styles.rowLink, configStyles.rowLink, {
          'm-right-2': ConnectedActionComponent
        })}
      >
        {Object.keys(columns).map(columnName => {
          const { component: CellComponent, parser: dataParser } = columns[columnName].cell || {};
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
              {CellComponent ? <CellComponent {...cellData} /> : cellData}
            </Cell>
          ) : null;
        })}
      </Link>
      {ConnectedActionComponent ? (
        <Cell
          key={`${data.id}-actions`}
          className={classNames(styles.cell, configStyles.cell, styles.actionCell)}
        >
          {ConnectedActionComponent ? <ConnectedActionComponent row={data} /> : null}
        </Cell>
      ) : null}
    </div>
  );
}

Row.propTypes = {
  action: actionType,
  columns: columnsType,
  config: configType,
  // eslint-disable-next-line react/forbid-prop-types
  data: any,
  url: string
};

Row.defaultProps = {
  action: {},
  config: {},
  url: ''
};

export default Row;
