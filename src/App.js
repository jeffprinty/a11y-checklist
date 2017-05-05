import React, { Component } from 'react';
import { Tabs, Tab } from 'react-tab-view'
import StarRatingComponent from 'react-star-rating-component';

import './App.css';

import wcag from '../public/wcag.json';

// const Selector = ({name}) => {
//   const selectId = name.toLowerCase();
//   return (
//     <span>
//       <label htmlFor={selectId}>{name}</label>
//       <select id={selectId}>
//         <option>*</option>
//         <option>**</option>
//         <option>***</option>
//         <option>****</option>
//         <option>*****</option>
//       </select>
//     </span>
//   )
// }

const customData = {
  "1-1-1": {
    "summary": "Provide text alternatives for non-text content",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-1": {
    "summary": "Provide an alternative to video-only and audio-only content",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-2": {
    "summary": "Provide captions for videos with audio",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-3": {
    "summary": "Video with audio has a second alternative",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-4": {
    "summary": "Video with audio has a second alternative",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-5": {
    "summary": "Users have access to audio description for video content",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-6": {
    "summary": "Provide sign language translations for videos",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-7": {
    "summary": "Provide extended audio description for videos",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-8": {
    "summary": "Provide a text alternative to your videos",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-2-9": {
    "summary": "Provide alternatives for live audio",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-3-1": {
    "summary": "Structure your website logically",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-3-2": {
    "summary": "Present your website content in a meaningful order",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-3-3": {
    "summary": "Use more than one sense for instructions",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-1": {
    "summary": "Don’t use presentation that relies solely on colour",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-2": {
    "summary": "Don’t play audio automatically",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-3": {
    "summary": "Contrast ratio between your text and background is at least 4.5:1",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-4": {
    "summary": "Text can be resized to 200% without loss of content or function",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-5": {
    "summary": "Don't use images of text",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-6": {
    "summary": "Contrast ratio between your text and background is at least 7:1",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-7": {
    "summary": "Your audio is clear for listeners to hear",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-8": {
    "summary": "Offer users a range of presentation options",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-9": {
    "summary": "Don't use images of text",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-1-1": {
    "summary": "Accessible by keyboard only",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-1-2": {
    "summary": "Your website must not trap keyboard users",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-1-3": {
    "summary": "Your website is accessible by keyboard only, without exception",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-2-1": {
    "summary": "Time limits have user controls",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-2-2": {
    "summary": "Provide user controls for moving content",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-2-3": {
    "summary": "No time limits on your website",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-2-4": {
    "summary": "Don't interrupt your users",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-2-5": {
    "summary": "Save user data when re-authenticating",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-3-1": {
    "summary": "No content flashes more than three times per second",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-3-2": {
    "summary": "No content flashes more than three times per second",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-1": {
    "summary": "Provide a ‘Skip to Content’ link",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-10": {
    "summary": "Break up content with headings",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-2": {
    "summary": "Use helpful and clear page titles",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-3": {
    "summary": "Pages work in a logical order",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-4": {
    "summary": "Every link's purpose is clear from its context",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-5": {
    "summary": "Offer several ways to find pages on your website",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-6": {
    "summary": "Use clear headings and labels",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-7": {
    "summary": "Ensure keyboard focus is visible and clear",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-8": {
    "summary": "Let users know where they are on your website",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-4-9": {
    "summary": "Every link's purpose is clear from its text",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-1-1": {
    "summary": "Every page of your website has a language assigned",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-1-2": {
    "summary": "Tell users when the language on a page changes",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-1-3": {
    "summary": "Explain any strange words",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-1-4": {
    "summary": "Explain any abbreviations",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-1-5": {
    "summary": "Users with nine years of school can read your content",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-1-6": {
    "summary": "Explain any words that are hard to pronounce",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-2-1": {
    "summary": "Elements do not change when they receive focus",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-2-2": {
    "summary": "Elements do not change when they receive input",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-2-3": {
    "summary": "Use menus in the same place across your website",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-2-4": {
    "summary": "Use menus in the same place across your website",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-2-5": {
    "summary": "Don’t change elements on your website until users ask",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-3-1": {
    "summary": "Clearly identify input errors",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-3-2": {
    "summary": "Label elements and give instructions",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-3-3": {
    "summary": "Suggest fixes when users make errors",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-3-4": {
    "summary": "Reduce the risk of input errors for sensitive data",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-3-5": {
    "summary": "Your website has detailed help and instructions",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "3-3-6": {
    "summary": "Reduce the risk of all input errors",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "4-1-1": {
    "summary": "Your website has no major code errors",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "4-1-2": {
    "summary": "Build all elements for accessibility",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  }
};

const responsibilities = ['dev','UI','UX','product'];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkValues: responsibilities
    }
  }

  checkToggle = (e) => {
    let checked;
    const node = document;
    checked = node.querySelectorAll('input[type="checkbox"]:checked');
    const checkValues =  Array.prototype.map.call(checked, function (e) {return e.value;});
    this.setState({ checkValues });
    console.log("checkValues", checkValues);
  }

  render() {
    let obj = {};
    const keys = wcag.map(item => {
      const newObj = {
        summary: item.wuhcag_summary,
        responsibility: "dev",
        testing: "Testing Strategies",
        compliance: 2,
        difficulty: 0,
      }
      obj[item.key] = newObj;
      return newObj;
    });
    //console.log(JSON.stringify(obj, null, 2));
    return (
      <div className="App">
        <div>
          {
            responsibilities.map((item,i) => {
              return (
                <span key={i}>
                  <input
                    id={`${item}_checkbox`}
                    type="checkbox"
                    checked={ this.state.checkValues.includes(item) }
                    onChange={ this.checkToggle.bind(this) }
                    value={item} />
                  <label htmlFor={`${item}_checkbox`}>{item}</label>
                </span>
              )
            })
          }
        </div>
        <table>
          <tbody>
            {
              wcag.map(item => {
                const {
                  //title,
                  key,
                  description,
                  uri,
                  conformance_level,
                  wuhcag_summary,
                  wuhcag_detail,
                  wuhcag_tips,
                  wuhcag_exceptions
                } = item;
                const data = customData[key];
                if (conformance_level === "AAA") return null;
                console.log("this.state.checkValues", this.state.checkValues, data.responsibility);
                //if (!this.state.checkValues.includes(data.responsibility)) return null;
                var isSuperset = data.responsibility.every(
                  (val) => {
                    return this.state.checkValues.indexOf(val) >= 0;
                  }
                );
                if (!isSuperset) return null;
                return (
                  <tr key={ key }>
                    <td className="left">
                      <b>
                        <a href={ uri }>
                          {key}
                        </a>
                      </b><br/>
                      {wuhcag_summary}
                      <hr/>
                      Compliance
                      <StarRatingComponent 
                          name={`${key}_compliance`} 
                          starCount={5}
                          value={obj[key].compliance}
                          onStarClick={() => {}}
                      />
                      Difficulty
                      <StarRatingComponent 
                          name={`${key}_difficulty`} 
                          starCount={5}
                          value={obj[key].difficulty}
                          onStarClick={() => {}}
                      />
                    </td>
                    <td>
                      <Tabs headers={['Description','Detail','Tips','Testing','Notes']}>
                        { 
                          [description, wuhcag_detail, wuhcag_tips, data].map((html,i) => {
                            return (
                              <Tab key={i}>
                                <div dangerouslySetInnerHTML={{__html: html }} />
                              </Tab>
                            )
                          })
                        }
                        <Tab>
                          <textarea />
                        </Tab>
                      </Tabs>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
