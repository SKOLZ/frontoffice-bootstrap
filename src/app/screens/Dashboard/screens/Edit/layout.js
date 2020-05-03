import React from 'react';
import { t } from 'i18next';
import { Field } from 'formik';

import styles from './styles.module.scss';

import leftArrow from '~assets/left-arrow.svg';
import Icon from '~components/Icon';
import { defaultInputs } from '~constants/structure';

function EditLayout({ modelData = {}, handleSubmit, handleCancel, handleDelete }) {
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className="row middle form-header">
        <button onClick={handleCancel} type="button" className="back-button m-right-2">
          <Icon src={leftArrow} classList={['back-id']} />
        </button>
        <h1 className="title2 capitalize m-right-auto">
          {t('Edit:resourceEdition', { resource: t(`${modelData.name}:model`) })}
        </h1>
        <button type="button" className="button-secondary" onClick={handleDelete}>
          {t('Create:delete')}
        </button>
      </div>
      <div className="form-body">
        {modelData.attributes
          ?.filter(attribute => !modelData.edit || modelData.edit.includes(attribute.name))
          .map(attribute => (
            <Field
              {...attribute.componentAttributes}
              key={attribute.name}
              component={attribute.component || defaultInputs[attribute.type]}
              className="form-field m-bottom-3"
              name={attribute.name}
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

export default EditLayout;
