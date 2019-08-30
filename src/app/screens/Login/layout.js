import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { Field, reduxForm } from 'redux-form';

import InputLabel from '../../components/InputLabel';

import { FIELDS, LOGIN_FORM_NAME } from './constants';
import styles from './styles.module.scss';

function Login({ handleSubmit }) {
  return (
    <div className={`${styles.loginContainer} row middle center`}>
      <form className={`column middle ${styles.formWrapper}`} onSubmit={handleSubmit}>
        <h2 className="title1 m-bottom-8 self-center">{t('Login:login')}</h2>
        <Field
          component={InputLabel}
          label={t('Login:email')}
          name={FIELDS.email}
          inputId={FIELDS.email}
          dataFor={FIELDS.email}
          inputType="text"
          inputClassName="m-bottom-3"
          placeholder={t('Login:emailPlaceholder')}
        />
        <Field
          component={InputLabel}
          label={t('Login:password')}
          name={FIELDS.password}
          inputId={FIELDS.password}
          dataFor={FIELDS.password}
          inputType="password"
          inputClassName="m-bottom-6"
          placeholder={t('Login:passwordPlaceholder')}
        />
        <button type="submit" className="m-bottom-1 button-primary">
          {t('Login:enter')}
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: LOGIN_FORM_NAME
})(Login);
