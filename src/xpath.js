import Actor from './ActorPreludeSample.xml'
const xpath = require('xpath')
const dom = require('xmldom').DOMParser
const xml = "<book><title>Harry Potter</title></book>"
const xml2 = Actor.toString()
const doc = new dom().parseFromString(xml2)
const nodes = xpath.select("//part/measure", doc)
// console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
console.log("Node: " + nodes[0])
// console.log(Actor["score-partwise"].part)
// let { part } = Actor["score-partwise"]
// let parts = part.map(item => item.measure)

// let notes = parts.map(measure => measure.map(item => {
//     item.note
//   }
// ))

// console.log(notes);
