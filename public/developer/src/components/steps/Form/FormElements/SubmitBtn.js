import React from 'react'

/**
 * 
 * @prop {Array} load
 * load is the membership_check_results array that
 * the component where submission happens neeeds
 * in order to determine whether the user needs to
 * be registered as a Member and a Developer, or
 * just as Developer 
 */
export const SubmitBtn = ({ text, handleSubmit, load }) => 
  <button
    onClick={() => handleSubmit(event, load)}
    type="submit" className="btn btn-primary"
  >
    { text }
  </button>