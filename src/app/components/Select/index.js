import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Select({
  className,
  textClassName,
  dataFor,
  label,
  inputClassName,
  placeholder,
  inputId,
  input,
  disabled,
  field,
  options
}) {
  return (
    <div className={`column start ${className}`}>
      <label className={`${textClassName} ${styles.select} m-bottom-1`} htmlFor={dataFor}>
        {label}
      </label>
      <select
        className={`select ${inputClassName}`}
        name={field.name}
        placeholder={placeholder}
        autoComplete="new-password"
        id={inputId}
        {...input}
        disabled={disabled}
        {...field}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
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

Select.defaultProps = {
  className: '',
  inputClassName: '',
  placeholder: '',
  textClassName: ''
};

export default Select;
