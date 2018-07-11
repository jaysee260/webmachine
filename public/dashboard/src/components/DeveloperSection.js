import React from "react";
import { JoinedClient } from './';

export const DeveloperSection = ({ content, affiliatedNetworks, handleCallToUpdateProfile }) => 
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
   
    {/* <h4>{ content.isNotDeveloper.description }</h4> */}
    {console.log(affiliatedNetworks.length, Array.isArray(affiliatedNetworks))}
    {affiliatedNetworks.affiliatedNetworks.length > 0 ? (
      <div className="affiliated-networks container">
        <h3 className="title">You're a developer for</h3>
        {affiliatedNetworks.affiliatedNetworks.map((current, i) => (
          <JoinedClient
            key={i}
            network={current}
          />
        ))}
      </div>
    ) : (
      <div className="no-affiliations">
        <h1>{ content.isNotDeveloper.title }</h1>
        <h4>{ content.isNotDeveloper.subtitle }</h4>
      </div>
    )}

    <div>
      <a href="/developer" className="btn btn-default">
        { content.buttonText }
      </a>
    </div>
  </section>