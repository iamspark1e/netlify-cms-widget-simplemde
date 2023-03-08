import PropTypes from 'prop-types';
import React from 'react';
import { marked } from 'marked';

export default function Preview({ value }) {
  return <div className='markdown-body' dangerouslySetInnerHTML={{__html: marked.parse(value)}}></div>;
}

Preview.propTypes = {
  value: PropTypes.node,
};