import React from "react";

export const DeveloperSection = ({ content }) => 
  <section>
    <h1>{ content.title }</h1>
    <h4>{ content.noSubscriptions }</h4>

    <div>
      <a href="#" className="btn btn-default">
        { content.buttonText }
      </a>
    </div>
  </section>