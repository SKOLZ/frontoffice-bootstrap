import React, { Component } from 'react';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

import structure from '~constants/structure';

import Routes from '~constants/routes';

import leftArrow from '~assets/left-arrow.svg';

import { actionCreators as modalActions } from '~redux/modal/actions';

import { actionCreators as resourceActions } from '~redux/resource/actions';

import { push } from 'connected-react-router';

import styles from './styles.module.scss';

class Detail extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    const resourceName = this.props.match.path.split('/')[1];
    this.props.dispatch(
      resourceActions.getResourceDetail({ resource: resourceName, id: this.props.match.params.id })
    );
    this.setState({
      data: structure.find(model => resourceName === model.endpoint)
    });
  }

  goBack = () => {
    this.props.dispatch(push(Routes.HOME));
  };

  handleCancel = () => {
    this.props.dispatch(modalActions.toggleCancelModal());
  };

  handleDelete = () => {
    this.props.dispatch(modalActions.toggleDeleteModal());
  };

  render() {
    return this.props.loading ? (
      <div className="ball-triangle-path">
        <div />
        <div />
        <div />
      </div>
    ) : (
      <>
        <div className="row middle form-header">
          <button onClick={this.goBack} type="button" className="back-button m-right-2">
            <ReactSVG
              src={leftArrow}
              beforeInjection={svg => {
                svg.classList.add('back-ic');
              }}
            />
          </button>
          <h1 className="title2 capitalize m-right-auto">
            {t('Detail:resourceDetail', { resource: this.state.data.name })}
          </h1>
          <button type="button" className="m-right-2 button-secondary m-bottom-1" onClick={this.handleDelete}>
            {t('Detail:delete')}
          </button>
          <Link to={`${this.props.match.url}/edit`} className="m-right-1 button-primary m-bottom-1">
            {t('Detail:edit')}
          </Link>
        </div>
        <div className={`column ${styles.detailBody}`}>
          {this.state.data.attributes?.map(attribute => (
            <div className={`row ${styles.detailRow}`} key={attribute.name}>
              <p className={`bold m-right-2 capitalize ${styles.detailFieldKey}`}>{attribute.name}:</p>
              <p className={styles.detailFieldValue}>{this.props.resource[attribute.name]}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  resource: store.resource.resource,
  loading: store.resource.resourceLoading
});

export default connect(mapStateToProps)(Detail);
