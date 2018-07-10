///////////////////////////////////////////////////////////////////////
////////////////////   Platform Loading Page   ////////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

"use strict";

import React from "react";
import "./styles/loadingpage.css";

const LoadingPage = () => (
  <div className="loading-page-wrapper">
    <div className="three-cogs fa-3x">
      <i className="fa fa-cog fa-spin fa-2x fa-fw"></i>
      <i className="fa fa-cog fa-spin fa-1x fa-fw"></i>
      <i className="fa fa-cog fa-spin fa-1x fa-fw"></i>
    </div>
  </div>
);

export default LoadingPage;
