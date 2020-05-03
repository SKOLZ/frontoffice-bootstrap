import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

const DEFAULT_MAX_DURATION = 500;

function CustomSuspense({ maxDuration, fallback, children }) {
  return (
    <Suspense maxDuration={maxDuration} fallback={fallback}>
      {children}
    </Suspense>
  );
}

CustomSuspense.defaultProps = {
  fallback: <Spinner />,
  maxDuration: DEFAULT_MAX_DURATION
};

CustomSuspense.propTypes = {
  fallback: PropTypes.element,
  maxDuration: PropTypes.number
};

export default CustomSuspense;
