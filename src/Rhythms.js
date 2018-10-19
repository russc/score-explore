import React from "react";
import Note from "./Note";

const Rhythms = ({ rhythms }) => (
  <div>
    <ul>
     Rhythms: {Object.keys(rhythms).map(rhythm => (<li key={rhythm}>{`${rhythm}: ${rhythms[rhythm]}`}</li>))}
    </ul>
  </div>
);

export default Rhythms;
