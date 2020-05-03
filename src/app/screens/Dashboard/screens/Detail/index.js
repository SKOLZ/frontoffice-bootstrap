import React, { useEffect, Fragment } from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import styles from './styles.module.scss';

import Spinner from '~components/Spinner';
import Icon from '~components/Icon';
import Routes from '~constants/routes';
import leftArrow from '~assets/left-arrow.svg';
import { actionCreators as modalActions } from '~redux/modal/actions';
import { actionCreators as resourceActions } from '~redux/resource/actions';

function Detail({ dispatch, match, loading, resource, data }) {
  useEffect(() => {
    const resourceName = data.endpoint;
    dispatch(resourceActions.getResourceDetail({ resource: resourceName, id: match.params.id }));
  }, []);

  const goBack = () => dispatch(push(Routes.HOME));

  const handleDelete = () => dispatch(modalActions.toggleDeleteModal());

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row middle form-header">
        <button onClick={goBack} type="button" className="back-button m-right-2">
          <Icon src={leftArrow} classList={['back-ic']} />
        </button>
        <h1 className="title2 capitalize m-right-auto">
          {t('Detail:resourceDetail', { resource: t(`${data.name}:model`) })}
        </h1>
        {(!data.only || data.only?.DESTROY) && (
          <button type="button" className="m-right-2 button-secondary m-bottom-1" onClick={handleDelete}>
            {t('Detail:delete')}
          </button>
        )}
        {(!data.only || data.only.EDIT) && (
          <Link to={`${match.url}/edit`} className="m-right-1 button-primary m-bottom-1">
            {t('Detail:edit')}
          </Link>
        )}
      </div>
      <div className={`column ${styles.detailBody}`}>
        {data.attributes
          ?.filter(
            attribute => !data.show || data.show?.includes(attribute.name) && attribute.type !== 'has_many'
          )
          .map(attribute => (
            <div className={`row ${styles.detailRow}`} key={attribute.name}>
              <span className={`bold m-right-2 capitalize ${styles.detailFieldKey}`}>
                {t(`${data.name}:${attribute.name}_attribute`)}:
              </span>
              <span className={styles.detailFieldValue}>
                {attribute.format?.(resource[attribute.name]) || resource[attribute.name]}
              </span>
            </div>
          ))}
      </div>
    </Fragment>
  );
}

const mapStateToProps = store => ({
  resource: store.resource.resource,
  loading: store.resource.resourceLoading
});

export default connect(mapStateToProps)(Detail);
