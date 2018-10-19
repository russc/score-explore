import seven from "./SevenNationArmy.xml";
import brooke from "./BrookeWest.xml";
import renegade from "./Renegade.xml";
import ava from "./ava_maria_excerpt.xml"
import viv from './vivaldi_winter.xml';

var parseString = require("xml2js").parseString;
const sets = [seven, brooke, renegade, ava, viv];
let works = [];

const convertAbc = noteString => {
  let abc;
  switch(noteString[2]){
    case 'f':
      abc = '_';
      break;
    case 's':
      abc = '^';
      break;
    default:
      abc = '';
      break;
  }

  abc += noteString[1];
  let diff = Math.abs(parseInt(noteString[0]) - 4);

  if(noteString[0] < 4) {
    let i;
    for (i = 0; i < diff; i++) {
      abc += ",";
    }
  } else if(noteString[0] > 4){
    let i;
    for (i = 0; i < diff; i++) {
      abc += "'";
    }
  }

  return abc;
}

convertAbc('3As');

sets.forEach(item => {
  parseString(item, function(err, result) {
    // console.log(result);
    // SET THE ROOT ELEMENT
    const root = result["score-partwise"];
    // DESTRUCTOR ITEMS FROM THE ROOT ELEMENT
    const { work: piece, identification: [{creator}], part } = root;
    const partList = root["part-list"];

    // SET THE MAIN OBJECT
    let work = {};
    work["title"] = piece !== undefined ? piece[0]["work-title"][0] : root["movement-title"];
    work[creator[0].$.type] = creator[0]._.replace(/[\n\r]/g, ' ');

    // ITTERATE THROUGH PARTS META AND RETURN OBJ
    let partsMeta = {};
    partList[0]["score-part"].map(meta => {
      // let id = meta.$.id;
      partsMeta[meta.$.id] = { name: meta["score-instrument"][0]["instrument-name"][0] };
    });
    
    // UPDATE WORK OBJECT WITH PARTS META
    work['partsMeta'] = partsMeta;

    // ITERATE THROUGH PARTS AND EXTRACT ALL CONTENT FROM MEASURES
    let measures = {};
    part.map(instrument => {
      let { $, measure } = instrument;
      let { clef, transpose=[{'chromatic':["0"], 'ditonic':["0"], 'octave-change':["0"]}] } = measure[0].attributes[0];
      
      // GATHER NOTES
      let notes = {};
      let rhythms = {};
      measure.map(bar => {
        bar.note.map(note => {
          // DISTINGUISH BETWEEN NOTES THAT HAVE PITCH VS REST VS OTHER
          let pitch, name;
          let type = note.type !== undefined ? note.type[0]: 'none';

          if(note.pitch !== undefined) {
            let alter = note.pitch[0].alter || '';
            switch(alter[0]){
              case '-1':
                name = `${note.pitch[0]['octave']}${note.pitch[0]['step']}f`;
                break;
              case '1':
                name = `${note.pitch[0]['octave']}${note.pitch[0]['step']}s`;
                break;
              default:
                name = `${note.pitch[0]['octave']}${note.pitch[0]['step']}n`;
                break;
            }
          } else {
            name = note.unpitched !== undefined 
            ? "unpitched" + note.unpitched[0]["display-octave"] + note.unpitched[0]["display-step"] 
            : "rest";
          }

          if(notes[name] && name !== "rest") {
            notes[name]++;
          } 
          else if (name !== "rest" ) {
            notes[name] = 1;
          }

          if(rhythms[type]) {
            rhythms[type]++;
          } 
          else {
            rhythms[type] = 1;
          }

        });
      }); 


      
      // UPDATE WORK OBJECT WITH NOTES PITCH & TRANSPOSITION DATA
      let noteOrder = Object.keys(notes).sort();
      let clefSign = clef[0].sign[0] === "F" ? 'bass' : clef[0].sign[0] === 'G' ? 'treble': 'perc';
      work["partsMeta"][$.id]["lowest"] = convertAbc(noteOrder[0]);
      work["partsMeta"][$.id]["highest"] = convertAbc(noteOrder[noteOrder.length - 1]);
      work['partsMeta'][$.id]['notes'] = notes;
      work['partsMeta'][$.id]['rhythms'] = rhythms;
      work['partsMeta'][$.id]['clef'] = clefSign;
      work['partsMeta'][$.id]['transposition'] = transpose[0];
    });
    // UPDATE WORKS ARRAY
    works.push(work);

    // TESTING
    console.log(work);
    // console.log(root);
  });
});

export default works;
