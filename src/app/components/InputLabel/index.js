import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function InputLabel({
  className,
  textClassName,
  dataFor,
  label,
  inputClassName,
  placeholder,
  inputId,
  inputType,
  input,
  disabled,
  field
}) {
  return (
    <div className={`column start ${className}`}>
      <label className={`${textClassName} ${styles.inputLabel} m-bottom-1`} htmlFor={dataFor}>
        {label}
      </label>
      <input
        className={`input ${inputClassName}`}
        name={field.name}
        placeholder={placeholder}
        autoComplete="new-password"
        id={inputId}
        type={field.type || inputType}
        {...input}
        disabled={disabled}
        {...field}
      />
    </div>
  );
}

InputLabel.propTypes = {
  className: PropTypes.string,
  dataFor: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  input: PropTypes.shape({}),
  inputClassName: PropTypes.string,
  inputId: PropTypes.string,
  inputType: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  textClassName: PropTypes.string
};

InputLabel.defaultProps = {
  className: '',
  inputClassName: '',
  placeholder: '',
  textClassName: ''
};

export default InputLabel;
