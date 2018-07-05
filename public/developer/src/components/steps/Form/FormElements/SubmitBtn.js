import React from 'react'

export const SubmitBtn = ({ text, handleSubmit }) => 
  <button
    onClick={() => handleSubmit()}
    type="submit" className="btn btn-primary"
  >
    { text }
  </button>