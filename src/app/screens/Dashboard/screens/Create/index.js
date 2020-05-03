import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import CreationContainer from './layout';

import { actionCreators as modalActions } from '~redux/modal/actions';
import { actionCreators as resourceActions } from '~redux/resource/actions';

function Create({ dispatch, data }) {
  const handleSubmit = body => dispatch(resourceActions.createResource({ resource: data.name, body }));
  const onCancel = () => dispatch(modalActions.toggleCancelModal());
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{}}
      render={props => <CreationContainer {...props} modelData={data} handleCancel={onCancel} />}
    />
  );
}

export default connect()(Create);
