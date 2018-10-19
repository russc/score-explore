import React from 'react';
import Note from './Note';

const Range = ({ lowest, highest, notes, id, clef, title }) => (
  <div>
    <small>
      Lowest Note: {lowest} | Highest Note: {highest}
    </small>
    {clef !== "perc" && (
      <Note
        id={title + id}
        name="C"
        clef={clef}
        abc={`${lowest} ${highest}`}
        width="100%"
      />
    )}
  </div>
);

export default Range;
