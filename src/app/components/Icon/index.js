import React from 'react';
import ReactSVG from 'react-svg';

function Icon({ src, classList }) {
  const beforeInjection = svg => {
    classList.forEach(cl => svg.classList.add(cl));
  };
  return <ReactSVG src={src} beforeInjection={beforeInjection} />;
}

export default Icon;
