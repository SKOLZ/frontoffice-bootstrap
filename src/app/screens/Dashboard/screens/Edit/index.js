import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import EditContainer from './layout';

import { actionCreators as modalActions } from '~redux/modal/actions';
import { actionCreators as resourceActions } from '~redux/resource/actions';
import Spinner from '~components/Spinner';

function Edit({ resource, dispatch, match, loading, data }) {
  useEffect(() => {
    if (!Object.keys(resource).length) {
      dispatch(
        resourceActions.getResourceDetail({
          resource: data.endpoint,
          id: match.params.id
        })
      );
    }
  }, []);

  const handleSubmit = body => {
    dispatch(
      resourceActions.editResource({
        resource: data.name,
        body: { ...body, id: match.params.id }
      })
    );
  };

  const onCancel = () => dispatch(modalActions.toggleCancelModal());

  const onDelete = () => dispatch(modalActions.toggleDeleteModal());
  return loading ? (
    <Spinner />
  ) : (
    <Formik
      onSubmit={handleSubmit}
      initialValues={resource}
      render={props => (
        <EditContainer {...props} modelData={data} handleCancel={onCancel} handleDelete={onDelete} />
      )}
    />
  );
}

const mapStateToProps = store => ({
  resource: store.resource.resource,
  loading: store.resource.resourceLoading
});

export default connect(mapStateToProps)(Edit);
