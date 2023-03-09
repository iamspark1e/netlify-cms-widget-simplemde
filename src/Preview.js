import PropTypes from 'prop-types';
import React from 'react';
import { marked } from 'marked';

export default function Preview({ value, getAsset }) {
  const previewRenderer = {
    image(href, title, text) {
      return `<img src="${getAsset(href)}" title="${title}" alt="${title || text || ''}" style="max-width:100%;display:block;" />`
    }
  }
  
  marked.use({renderer: previewRenderer})
  return <div className='markdown-body' dangerouslySetInnerHTML={{__html: marked.parse(value)}}></div>;
}

Preview.propTypes = {
  value: PropTypes.node,
};