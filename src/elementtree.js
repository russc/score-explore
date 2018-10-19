import data from './ActorPreludeSample.xml'
import { log } from 'async';
import { format } from 'util';
const et = require("elementtree");

const XML = et.XML;
const ElementTree = et.ElementTree;
const element = et.Element;
const subElement = et.SubElement;

const etree = et.parse(data);
let notes = etree.findall(".//note");
let partlist = etree.findall('.//score-part');

let rhythms = []
let parts = []

const elementToObject = (el, obj) => {
  let { tag, text } = el;
  console.log(typeof text)
  obj[tag] = text;
  return obj
}

const getChildren = arr => arr._children.map(child => {
  // let { text, tag } = child
  return child.text
})

console.log(partlist.map(part => getChildren(part)));

// notes.map(note => {
//   let { _children } = note
//   let pitches = []
//   // TURN THIS MAP INTO A FUNCTION
//   let props = {}
//   _children.map(el => { 
//     elementToObject(el, props)
//   })
//   rhythms.push({ props })
// });

//CREATE A FORM, BUT USE THIS XML PARSER TO PREFILL THE FORM SO THAT 
// PEOPLE CAN PEER EDIT.  THIS WILL HAPPEN.  I WILL BUILD THIS.
