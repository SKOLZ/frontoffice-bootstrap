import React from 'react';
import { t } from 'i18next';
import { Field } from 'formik';

import styles from './styles.module.scss';

import leftArrow from '~assets/left-arrow.svg';
import Icon from '~components/Icon';
import { defaultInputs } from '~constants/structure';

function CreationLayout({ modelData, handleSubmit, handleCancel }) {
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className="row middle start form-header">
        <button onClick={handleCancel} type="button" className="back-button m-right-2">
          <Icon src={leftArrow} classList={['back-ic']} />
        </button>
        <h1 className="title2 capitalize">{t('Create:resourceCreation', { resource: modelData.name })}</h1>
      </div>
      <div className="form-body">
        {modelData.attributes &&
          modelData.attributes
            .filter(attribute => !modelData.create || modelData.create.includes(attribute.name))
            .map(attribute => (
              <Field
                {...attribute.componentAttributes}
                key={attribute.name}
                component={attribute.component || defaultInputs[attribute.type]}
                className="form-field m-bottom-3"
                name="id"
                label={t(`${modelData.name}:${attribute.name}_attribute`)}
                type={attribute.type}
              />
            ))}
      </div>
      <div className="row form-actions">
        <button type="submit" className="m-right-2 button-primary">
          {t('Create:save')}
        </button>
        <button type="button" className="button-secondary" onClick={handleCancel}>
          {t('Create:cancel')}
        </button>
      </div>
    </form>
  );
}

export default CreationLayout;
