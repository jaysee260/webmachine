import React from "react";

export const DeveloperSection = ({ content }) => 
  <section>
    {/*
      In essence... This section needs to render
      a set of content if the person is a developer
      for AT LEAST one network, and another set of
      content if the person is not a developer for
      ANY network.

      The button to browse networks that support a
      marketplace should always render.
    */}
    <h1>{ content.isNotDeveloper.title }</h1>
    <h4>{ content.isNotDeveloper.subtitle }</h4>
    {/* <h4>{ content.isNotDeveloper.description }</h4> */}

    <div>
      <a href="/developer" className="btn btn-default">
        { content.buttonText }
      </a>
    </div>
  </section>