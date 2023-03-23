import PropTypes from 'prop-types';
import React from 'react';
import { marked } from 'marked';

export default function Preview({ value, getAsset }) {
  const previewRenderer = {
    image(href, title, text) {
      return `<img src="${getAsset(href)}" title="${title}" alt="${title || text || ''}" style="max-width:100%;display:block;" />`
    }
  }

  marked.use({ renderer: previewRenderer })
  const styled = `.markdown-body pre {
    max-width: 100%;
    overflow-x: auto;
}
.markdown-body img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
}`
  return <div>
    <style>{styled}</style>
    <div className='markdown-body' dangerouslySetInnerHTML={{ __html: marked.parse(value) }}></div>
  </div>;
}

Preview.propTypes = {
  value: PropTypes.node,
};