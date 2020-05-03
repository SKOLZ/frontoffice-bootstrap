import React from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { withRouter } from 'react-router-dom';

import styles from './styles.module.scss';

import { actionCreators as modalActions } from '~redux/modal/actions';
import { actionCreators as resourceActions } from '~redux/resource/actions';

function DeleteModal({ deleteResource, deleteId, open, toggleDeletemodal }) {
  const handleClose = () => {
    const attributes = window.location.pathname.split('/').slice(1);
    deleteResource({ resource: attributes[0], id: deleteId || attributes[1] });
    toggleDeletemodal();
  };
  return (
    <Modal
      open={open}
      onClose={toggleDeletemodal}
      center
      classNames={{ modal: styles.modalWrapper, closeIcon: 'modal-close' }}
    >
      <div className={`${styles.modalContent} column center`}>
        <h2 className="subtitle m-bottom-6">{t('DeleteModal:modalTitle')}</h2>
        <div className="row center">
          <button type="button" onClick={handleClose} className="button-primary m-right-2">
            {t('DeleteModal:confirm')}
          </button>
          <button type="button" onClick={toggleDeletemodal} className="button-secondary">
            {t('DeleteModal:cancel')}
          </button>
        </div>
      </div>
    </Modal>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleDeletemodal: () => dispatch(modalActions.toggleDeleteModal()),
  deleteResource: params => dispatch(resourceActions.deleteResource(params))
});

const mapStateToProps = state => ({
  deleteId: state.modal.deleteId
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteModal));
