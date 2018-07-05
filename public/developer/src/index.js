
///////////////////////////////////
/////    Page Entry Point     /////
///////////////////////////////////

import React                     from 'react';
import ReactDOM                  from 'react-dom';
import DeveloperRegistration     from './DeveloperRegistration';

ReactDOM.render(
  <DeveloperRegistration />,
  document.getElementById('root')
);

module.hot.accept();
