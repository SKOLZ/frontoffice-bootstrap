import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

const initialState = {
  deleteModal: false,
  cancelModal: false,
  deleteId: null
};

const reducerDescription = {
  primaryActions: [actions.TOGGLE_CANCEL_MODAL],
  override: {
    [actions.TOGGLE_CANCEL_MODAL]: state => ({
      ...state,
      cancelModal: !state.cancelModal
    }),
    [actions.TOGGLE_DELETE_MODAL]: (state, action) => ({
      ...state,
      deleteModal: !state.deleteModal,
      deleteId: action.payload?.id
    })
  }
};

export default createReducer(initialState, completeReducer(reducerDescription));
