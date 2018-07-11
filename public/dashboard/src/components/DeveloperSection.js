import React from "react";
import { JoinedClient } from './';
import { FlexItem } from 'Common/grid';

export const DeveloperSection = ({ content, affiliatedNetworks, handleCallToUpdateProfile }) => 
  <section>
    {/*
      If user is developer for at least ONE network,
      render it/them. 
      Otherwise, render alternative message.
    */}
   
    {affiliatedNetworks.affiliatedNetworks.length > 0 ? (
      <div className="affiliated-networks">

        <h3 className="title">You're a developer for</h3>
        <div className="owned-networks">
          {affiliatedNetworks.affiliatedNetworks.map((current, i) => (
              <JoinedClient
                key={i}
                network={current}
              />
          ))}
        </div>

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