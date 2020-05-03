import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { arrayOf, bool, any, number, func } from 'prop-types';

import styles from './styles.module.scss';
import { DEFAULT_LIMIT } from './constants';
import { parseList, getColumns } from './utils';

import { actionCreators as resourceActions } from '~redux/resource/actions';
import { actionCreators as paginatorActions } from '~redux/Paginator/actions';
import Paginator from '~components/Paginator';
import Spinner from '~components/Spinner';
import Table from '~components/Table';

function Index({
  match,
  getResource,
  list,
  listError,
  loading,
  currentPage,
  totalPages,
  nextPage,
  setCurrentPage,
  data
}) {
  useEffect(() => {
    getResource(data.endpoint, currentPage, DEFAULT_LIMIT);
  }, [currentPage]);

  const handlePageChange = newPage => setCurrentPage(newPage);
  const { endpoint, attributes, only } = data;

  const columns = getColumns(
    attributes?.filter(attribute => !data.index || data.index.includes(attribute.name))
  );
  const bodies = parseList(list, endpoint);
  return (
    <Fragment>
      <div className="row space-between middle form-header">
        <h1 className="title2">{t('Index:componentList', { component: t(`${data.name}:model`) })}</h1>
        {(!only || only.CREATE) && (
          <Link to={`${match.path}/new`} className={`${styles.link} button-primary`}>
            {t('Index:create')}
          </Link>
        )}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Table
            bodies={bodies}
            columns={columns}
            error={listError}
            errorMessage={t('Table:errorData')}
            loading={loading}
            data={data}
            config={{ styles: { headers: styles.headers } }}
          />
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            nextPage={nextPage}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

Index.propTypes = {
  getResource: func.isRequired,
  setCurrentPage: func.isRequired,
  currentPage: number,
  list: arrayOf(any),
  listError: bool,
  loading: bool,
  nextPage: number,
  totalPages: number
};

const mapStateToProps = state => ({
  currentPage: state.paginator.currentPage,
  totalPages: state.paginator.totalPages,
  count: state.paginator.count,
  list: state.resource.page,
  totalCount: state.paginator.totalCount,
  nextPage: state.paginator.nextPage,
  listError: state.resource.pageError,
  loading: state.resource.pageLoading
});

const mapDispatchToProps = dispatch => ({
  getResource: (resource, page, limit) => dispatch(resourceActions.getResource(resource, page, limit)),
  setCurrentPage: newPage => dispatch(paginatorActions.setCurrentPage(newPage))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
