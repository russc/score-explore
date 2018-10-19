import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import counterApp from './reducer'
import Counter from './Counter'
// import './elementtree'
// import './xpath'
import './xml2js'
import works from './xml2js'
import Range from './Range'
import Rhythms from './Rhythms'

let store = createStore(counterApp)
// console.log(works[4]);

render(
  <Provider store={store}>
    <div>
      <Counter />
      <div id="example">
        <h1>Works</h1>
        {works.map((work, index) => (
          <div key={index}>
            <h2>{work.title}</h2>
            {/* <input type="text" value={work.title}/> */}
            <p>{work.composer}</p>
            <ul>
              {Object.keys(work.partsMeta).map(part => (
                <li key={part}>
                  {work.partsMeta[part].name}
                  <Range
                    id={part}
                    title={work.title}
                    clef={work.partsMeta[part].clef}
                    lowest={work.partsMeta[part].lowest}
                    highest={work.partsMeta[part].highest}
                    notes={Object.keys(work.partsMeta[part].notes)}
                  />
                  <Rhythms rhythms={work.partsMeta[part].rhythms} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Provider>,
  document.getElementById("root")
);