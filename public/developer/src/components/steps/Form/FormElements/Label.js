import React from 'react';

/**
 * @prop {String} forHtml - sets HTML for attribute of label
 * @prop {String} innerText - sets label's inner text
 */

export const Label = ({ forHtml, innerText }) =>
  <label htmlFor={forHtml}>
    { innerText }
  </label>

