import { createTypes, completeTypes, withSuccess, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import { history } from '../store';

import { defaultCamelcase } from '~serializer/defaultSerializer';

import * as ConectorService from '~services/ConectorService';

import { actionCreators as paginatorActions } from '~redux/Paginator/actions';

import Routes from '~constants/routes';

import { formatPaging } from './utils';

export const actions = createTypes(
  completeTypes(
    ['GET_RESOURCE', 'GET_RESOURCE_DETAIL', 'DELETE_RESOURCE', 'EDIT_RESOURCE', 'CREATE_RESOURCE'],
    []
  ),
  '@@RESOURCE'
);

export const actionCreators = {
  getResource: (resource, page, limit) => ({
    type: actions.GET_RESOURCE,
    target: 'page',
    service: ConectorService.getList,
    payload: { resource, page, limit },
    successSelector: response => defaultCamelcase.serialize(response.data.page),
    failureSelector: response => response.data,
    injections: [
      withPostSuccess((dispatch, response) => {
        dispatch(paginatorActions.setPagingOptions(formatPaging(response.data)));
      })
    ]
  }),
  getResourceDetail: data => ({
    type: actions.GET_RESOURCE,
    service: ConectorService.getDetail,
    payload: data,
    target: 'resource'
  }),
  createResource: data => ({
    type: actions.CREATE_RESOURCE,
    service: ConectorService.createResource,
    payload: data,
    injections: [
      withSuccess(dispatch => {
        dispatch(push(Routes.HOME));
      })
    ]
  }),
  deleteResource: data => ({
    type: actions.DELETE_RESOURCE,
    service: ConectorService.deleteResource,
    payload: data,
    injections: [
      withSuccess(() => {
        history.goBack();
      })
    ]
  }),
  editResource: data => ({
    type: actions.EDIT_RESOURCE,
    service: ConectorService.editResource,
    payload: data,
    injections: [
      withSuccess(dispatch => {
        dispatch(push(Routes.HOME));
      })
    ]
  })
};
