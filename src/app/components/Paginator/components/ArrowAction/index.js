import React, { Component } from 'react';
import { string, number, func } from 'prop-types';
import classNames from 'classnames';

import { NEXT, PREVIOUS, DEFAULT_CURRENT_PAGE } from '../../constants';

import { isDisabled } from './utils';
import styles from './styles.module.scss';

import Button from '~components/Button';

class ArrowAction extends Component {
  handleClick = () => {
    const { currentPage, onPageChange, type, nextPage } = this.props;
    if (type === NEXT && nextPage) {
      onPageChange(currentPage + DEFAULT_CURRENT_PAGE);
    } else if (type === PREVIOUS && currentPage !== DEFAULT_CURRENT_PAGE) {
      onPageChange(currentPage - DEFAULT_CURRENT_PAGE);
    }
  };

  render() {
    const { className, nextPage, currentPage, type, text } = this.props;
    const disabled = isDisabled(type, currentPage, nextPage);

    return (
      <Button
        disabled={disabled}
        onClick={this.handleClick}
        className={classNames(`${styles.arrowButton} ${className}`, { [styles.enabledArrow]: !disabled })}
      >
        {text}
      </Button>
    );
  }
}

ArrowAction.propTypes = {
  className: string.isRequired,
  text: string.isRequired,
  type: string.isRequired,
  onPageChange: func.isRequired,
  currentPage: number,
  nextPage: number
};

export default ArrowAction;
