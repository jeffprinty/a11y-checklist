import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-tab-view'
import StarRatingComponent from 'react-star-rating-component';

import './App.css';

import wcag from '../public/wcag.json';

const StyledCheckbox = styled.span`
  width: 20px;
  position: relative;
  margin: 20px auto;
  line-height: 40px;
  span.check {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(top, #222 0%, #45484d 100%);
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);
    &:after {
      content: '';
      width: 9px;
      height: 5px;
      position: absolute;
      top: 4px;
      left: 4px;
      border: 3px solid #fcfff4;
      border-top: none;
      border-right: none;
      background: transparent;
      opacity: 0;
      transform: rotate(-45deg);
    }
    &:hover::after {
      opacity: 0.3;
    }
  }
  label {
    cursor: pointer;
    margin-left: 26px;
    margin-right: 12px;
  }
  input[type=checkbox] {
    opacity: 0;
    width: 70px;
    height: 36px;
    position: absolute;
    z-index: 999;
    &:checked + span:after {
      opacity: 1;
    }
  }
`;

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

const phases = ['phase1','phase2','phase3','phase4']

const customData = {
  "1-1-1": {
    "summary": "Provide text alternatives for non-text content",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase2": "Form Field Labels: Tie each user input control (e.g. text field, radio button, pull-down menu) to text that describes the purpose of the control, using conventions for the media type. It should be noted that placeholder text by itself is not an adequate labeling technique.",
    "phase3": `Images that Provide Info: If an image provides information, provide the same information in a text alternative.
Image Buttons and Links If an image represents a control or a link, provide text that can serve the same purpose when images are not available.
Decorative and Redundant Images: Allow screen reading software to ignore features that are purely decorative, including images whose meaning is fully expressed through adjacent text.`
  },
  "1-2-1": {
    "summary": "Provide an alternative to video-only and audio-only content",
    "responsibility": ["content"],
    "testing": "Testing Strategies",
    "phase4": `Transcripts and Visual Alerts: When audio provides information: Provide the same information in a text transcript OR in the case of audio used to indicate status (e.g. a beep, "You've got mail"), provide a visual indication of status as well`
  },
  "1-2-2": {
    "summary": "Provide captions for videos with audio",
    "responsibility": ["content"],
    "testing": "Testing Strategies",
    "phase4": "Captions When movies, animations, slideshows or games use synchronized visuals and sound to provide information, use captions to provide all important auditory information. "
  },
  "1-2-3": {
    "summary": "Video with audio has a second alternative",
    "responsibility": ["content","UX"],
    "testing": "Testing Strategies",
    "phase3": `Complete Narration and Audio Description: When multimedia (e.g. video, narrated animation) includes important visual and auditory information, provide spoken description of any significant visual elements that would be missed when listening to the audio alone.`
  },
  "1-2-4": {
    "summary": "Live Video with audio has a second alternative",
    "responsibility": ["content","live"],
    "testing": "Testing Strategies"
  },
  "1-2-5": {
    "summary": "Users have access to audio description for video content",
    "responsibility": ["content"],
    "testing": "Testing Strategies",
    "phase3": `Complete Narration and Audio Description: When multimedia (e.g. video, narrated animation) includes important visual and auditory information, provide spoken description of any significant visual elements that would be missed when listening to the audio alone.`
  },
  "1-2-6": {
    "summary": "Provide sign language translations for videos",
    "responsibility": ["content"],
    "testing": "Testing Strategies"
  },
  "1-2-7": {
    "summary": "Provide extended audio description for videos",
    "responsibility": ["content"],
    "testing": "Testing Strategies",
    "phase3": `Complete Narration and Audio Description: When multimedia (e.g. video, narrated animation) includes important visual and auditory information, provide spoken description of any significant visual elements that would be missed when listening to the audio alone.`
  },
  "1-2-8": {
    "summary": "Provide a text alternative to your videos",
    "responsibility": ["content","UX"],
    "testing": "Testing Strategies"
  },
  "1-2-9": {
    "summary": "Provide alternatives for live audio",
    "responsibility": ["live","content"],
    "testing": "Testing Strategies"
  },
  "1-3-1": {
    "summary": "Structure your website logically",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase1": "Identify roles (e.g. heading, numbered list, bulleted list, data table, paragraph, emphasized text) of page elements using conventions for the media type. (And do not misidentify roles by using those conventions solely for their visual effects.)<br/>When text formatting (e.g. italic, underline, bold, font size) is used to provide information that goes beyond emphasis, also provide the information through an additional method.",
    "phase2": "Do not use presentation layers (e.g. css, styles) to provide information unless the information is also presented through content or through semantic markup. (And do not use presentation layers to hide content that would be disruptive or misleading if shown.)",
    "phase4": "Hidden or Dimmed Content Ensure screen readers will ignore content that has been hidden or dimmed as part of the media's functionality if the inclusion of that content would be confusing or misleading.<br/>Mirroring Source Materials When creating alternative versions (e.g. alt-text for an image, e-book alternative to a printed text), keep content divisions (e.g. page numbers, learning unit divisions) and user interface elements (e.g. text label for a button, whether a list is numbered or bulleted) consistent with the standard version."
  },
  "1-3-2": {
    "summary": "Present your website content in a meaningful order",
    "responsibility": ["dev","Ux"],
    "testing": "Testing Strategies",
    "phase1": "Ensure that current screen reading software (screen readers) can read the media in a sensible order.",
    "phase2": `User Interface Instructions  When identifying features of user interfaces in instructions and help content, include semantic information and labels as opposed to exclusively referring to visual formatting (e.g. "the option furthest to the right", "in the blue area") or to auditory information (e.g. "when you hear a beep").`,
    "phase4": "Hidden or Dimmed Content Ensure screen readers will ignore content that has been hidden or dimmed as part of the media's functionality if the inclusion of that content would be confusing or misleading."
  },
  "1-3-3": {
    "summary": "Use more than one sense for instructions",
    "responsibility": ["dev","UX","content"],
    "testing": "Testing Strategies"
  },
  "1-4-1": {
    "summary": "Don’t use presentation that relies solely on colour",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase3": `Don’t Rely on Color Coding When color is used to provide information, also provide the information through another visual method.
    Color Contrast in Key Images  Design graphics so that pertinent content will not be lost from lack of contrast when viewed with common variations in color-vision (color-blindness).`
  },
  "1-4-2": {
    "summary": "Don’t play audio automatically",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase4": "If audio plays longer than three seconds, either only play the audio on user request or allow it to be stopped easily using a screen reader. Allow users to restart and replay any audio that provides information."
  },
  "1-4-3": {
    "summary": "Contrast ratio between your text and background is at least 4.5:1",
    "responsibility": ["dev",'UX'],
    "testing": "Testing Strategies",
    "phase3": `Contrast for Text Readability  
Using a contrast ratio tool, choose text color and text background color so that the contrast ratio between the colors is at least:
4.5:1 for small text
3:1 for text that is at least 18 points or bold 14 points (it should be noted that font sizes for this particular guideline are measured in points, not pixels, presenting a challenge in accurately measuring “large” text, thus we do not recommend using this exception).
7:1 when one of the colors is red (or nearly red) and other color is black (or nearly black)
3:1 for link text vs. surrounding text when color is the only differentiating characteristic of link text (e.g. no underline).`
  },
  "1-4-4": {
    "summary": "Text can be resized to 200% without loss of content or function",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase2": "Text Resize: Ensure that text size (except for captions) can be increased to at least 200% using controls in either the user agent (e.g. Web browser, PDF reader, Flash player) or the media. No content or functionality should be lost."
  },
  "1-4-5": {
    "summary": "Don't use images of text",
    "responsibility": ["dev","content","UX"],
    "testing": "Testing Strategies",
    "phase2": "Encoded Text: Use encoded text instead of images of text except:Where the particular presentation is essential (e.g. image of an ancient manuscript, hand writing sample, screen capture, logo); or,Where the text in question is not the main body copy and images of text are the only way to achieve the design goals (e.g. special font, anti-aliasing)"
  },
  "1-4-6": {
    "summary": "Contrast ratio between your text and background is at least 7:1",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "1-4-7": {
    "summary": "Your audio is clear for listeners to hear",
    "responsibility": ["content"],
    "testing": "Testing Strategies",
    "phase4": "Audio Clarity/Contrast: When you have the opportunity to set the volume of speech relative to volume of background sound: Allow the user to access the foreground speech without the background sound (e.g. control to turn off background sound, separate volume controls) OR Set the background sound to be 20 decibels lower than the foreground speech"
  },
  "1-4-8": {
    "summary": "Offer users a range of presentation options",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "1-4-9": {
    "summary": "Don't use images of text",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-1-1": {
    "summary": "Accessible by keyboard only",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase1": "Ensure that keyboard keys (instead of a mouse and instead of touch screen gestures that require eye-hand coordination) can be used to: Reach and operate all controls AND Navigate through active elements, following the reading order "
  },
  "2-1-2": {
    "summary": "Your website must not trap keyboard users",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase1": "Provide instructions describing the keys (or gestures) needed for keyboard access if your media uses keys or techniques that differ from user agent (e.g. Web browser, PDF reader) or mobile device defaults."
  },
  "2-1-3": {
    "summary": "Your website is accessible by keyboard only, without exception",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-2-1": {
    "summary": "Time limits have user controls",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase1": `If Macmillan Guideline 2 would invalidate a timed activity:
Allow instructors or administrators to adjust time limits for particular students OR
Allow students to adjust the time or just complete the activity after the time limit is reached. And, record the time spent with the results.`
  },
  "2-2-2": {
    "summary": "Provide user controls for moving content",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase3": "Ability to Stop Motion: Allow users to stop any content that moves for more than five seconds or that updates automatically<br/>Stationary View of Moving Content: Allow the user to read text, equations & diagrams while they are not moving, auto scrolling or being automatically changed/replaced."
  },
  "2-2-3": {
    "summary": "No time limits on your website",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-2-4": {
    "summary": "Don't interrupt your users",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-2-5": {
    "summary": "Save user data when re-authenticating",
    "responsibility": ["dev"],
    "testing": "Testing Strategies"
  },
  "2-3-1": {
    "summary": "No content flashes more than three times per second",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase3": "No Blinking/No Flickering  Design e-learning so that it does not cause blink, flash or flicker."
  },
  "2-3-2": {
    "summary": "No content flashes more than three times per second",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase3": "No Blinking/No Flickering  Design e-learning so that it does not cause blink, flash or flicker."
  },
  "2-4-1": {
    "summary": "Provide a ‘Skip to Content’ link",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase1": "When distinguishable features or sections (e.g. navigation, main content, individual news articles) appear on a page or in a document, provide a way to navigate to the features or sections using a screen reader and the keyboard."
  },
  "2-4-10": {
    "summary": "Break up content with headings",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-4-2": {
    "summary": "Use helpful and clear page titles",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase2": "Page and Frames Titles: For each frame and for each primary media file (e.g. HTML page, Flash movie, PDF document) provide a title that: Reflects the purpose or topic of the frame or file; and, Differentiates the frame or file from the others in your site"
  },
  "2-4-3": {
    "summary": "Pages work in a logical order",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-4-4": {
    "summary": "Every link's purpose is clear from its context",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase2": "Meaningful Link Text: Write links so that a user who is aware of the topic of the page will understand the purpose of the link when reading one of the following: Link Text Alone: Link text out of context (preferred if possible without awkwardness or redundant text. This is a WCAG 2.0 AAA success criteria, and while it’s the best practice, it’s not a requirement.) Nearest Heading, Nearest Parent List Item, or Table Headers: Link text and the nearest heading above the link, OR link text and the nearest parent list item in a nested list, OR link text in a data table cell and the cell's table headers (These options are only available where semantic markup is possible as in HTML.) Sentence: Link text and the sentence that contains the link. Link Pattern: Link text within the context of other links preceding the link on the same page."
  },
  "2-4-5": {
    "summary": "Offer several ways to find pages on your website",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-4-6": {
    "summary": "Use clear headings and labels",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-4-7": {
    "summary": "Ensure keyboard focus is visible and clear",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase1": "Ensure that the user's location on the page will be visually apparent when keyboard keys are used to move from item to item."
  },
  "2-4-8": {
    "summary": "Let users know where they are on your website",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "2-4-9": {
    "summary": "Every link's purpose is clear from its text",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase2": "Meaningful Link Text: Write links so that a user who is aware of the topic of the page will understand the purpose of the link when reading one of the following: Link Text Alone: Link text out of context (preferred if possible without awkwardness or redundant text. This is a WCAG 2.0 AAA success criteria, and while it’s the best practice, it’s not a requirement.) Nearest Heading, Nearest Parent List Item, or Table Headers: Link text and the nearest heading above the link, OR link text and the nearest parent list item in a nested list, OR link text in a data table cell and the cell's table headers (These options are only available where semantic markup is possible as in HTML.) Sentence: Link text and the sentence that contains the link. Link Pattern: Link text within the context of other links preceding the link on the same page."
  },
  "3-1-1": {
    "summary": "Every page of your website has a language assigned",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase2": "Human Language: Indicate human language (e.g. Arabic, Chinese, English) following conventions for the media type."
  },
  "3-1-2": {
    "summary": "Tell users when the language on a page changes",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase2": "Human Language: Indicate human language (e.g. Arabic, Chinese, English) following conventions for the media type."
  },
  "3-1-3": {
    "summary": "Explain any strange words",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-1-4": {
    "summary": "Explain any abbreviations",
    "responsibility": ["content"],
    "testing": "Testing Strategies"
  },
  "3-1-5": {
    "summary": "Users with nine years of school can read your content",
    "responsibility": ["content"],
    "testing": "Testing Strategies"
  },
  "3-1-6": {
    "summary": "Explain any words that are hard to pronounce",
    "responsibility": ["content"],
    "testing": "Testing Strategies"
  },
  "3-2-1": {
    "summary": "Elements do not change when they receive focus",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies",
    "phase1": "Do not change the user's location (e.g. place on the page, page/url, frame, window or user agent) as follows: When the user moves to (on focus, on mouse over, on touch start) or away from (on blur, on mouse out, on touch end) any element including form control options OR When the user changes the setting of a UI control, unless each option can be reached by the keyboard without selecting it and it is clear what will happen when the setting is changed"
  },
  "3-2-2": {
    "summary": "Elements do not change when they receive input",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-2-3": {
    "summary": "Use menus in the same place across your website",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-2-4": {
    "summary": "Use menus in the same place across your website",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-2-5": {
    "summary": "Don’t change elements on your website until users ask",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-3-1": {
    "summary": "Clearly identify input errors",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-3-2": {
    "summary": "Label elements and give instructions",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-3-3": {
    "summary": "Suggest fixes when users make errors",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-3-4": {
    "summary": "Reduce the risk of input errors for sensitive data",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "3-3-5": {
    "summary": "Your website has detailed help and instructions",
    "responsibility": ["UX","content"],
    "testing": "Testing Strategies"
  },
  "3-3-6": {
    "summary": "Reduce the risk of all input errors",
    "responsibility": ["dev","UX"],
    "testing": "Testing Strategies"
  },
  "4-1-1": {
    "summary": "Your website has no major code errors",
    "responsibility": ["dev"],
    "testing": "Testing Strategies",
    "phase2": "Valid Markup and Spelling  When using markup languages (e.g. HTML, XHTML, SMIL) follow the specifications for the language and test for errors using a validator. When using human languages (e.g. English, Hindi, Japanese) test for spelling errors using a spell checker. "
  },
  "4-1-2": {
    "summary": "Build all elements for accessibility",
    "responsibility": ["dev"],
    "testing": "Testing Strategies",
    "phase1": "Ensure that screen reader users can find new dynamically-added content (e.g. expanding menus, alerts, error messages, hints that appear on rollover).",
    "phase2": "UI Control Role, Name, State & Options Use standard user input controls (e.g. HTML form controls, Flash accessible components) for their intended purpose or, if no appropriate standard controls exist, create or repurpose controls so 130 that screen readers present the role, name, current state (including changes in state) and available options."
  }
};

const checkValues = ['phase1','phase2','phase3','phase4','dev','UX','content','media','live'];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkValues
    }
  }

  checkToggle = (e) => {
    let checked;
    const node = document;
    checked = node.querySelectorAll('input[type="checkbox"]:checked');
    const checkValues =  Array.prototype.map.call(checked, function (e) {return e.value;});
    this.setState({ checkValues });
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
        <h1>Macmillan A11y Assessment Tool</h1>
        <div className="checkBar">
          <strong>Filters:  </strong>
          {
            checkValues.map((item,i) => {
              return (
                <StyledCheckbox className="styledCheckbox" key={i}>
                  <input
                    id={`${item}_checkbox`}
                    name={ item }
                    type="checkbox"
                    checked={ this.state.checkValues.includes(item) }
                    onChange={ this.checkToggle.bind(this) }
                    value={item} />
                  <span className="check" />
                  <label htmlFor={`${item}_checkbox`}>{item}</label>
                </StyledCheckbox>
              )
            })
          }
        </div>
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              
            </tr>
          </thead>
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

                let show = false;

                const filterableFields = Object.keys(data).filter(key => {
                  return /^phase/.test(key);
                });

                const filterables = filterableFields.concat(data.responsibility);
                console.log("filterables", filterables);

                filterables.forEach(rr => {
                  if (this.state.checkValues.includes(rr)) {
                    show = true
                  }
                })
                
                if (!show) return null;

                return (
                  <tr key={ key }>
                    <td className="left">
                      <h2>
                        <a href={ uri } target="_new">{key}</a>
                      </h2>
                      <div className="summary">
                        {wuhcag_summary}
                      </div>
                      <hr/>
                      <b>Compliance</b>
                      <StarRatingComponent 
                          name={`${key}_compliance`} 
                          starCount={5}
                          value={obj[key].compliance}
                          onStarClick={() => {}}
                      />
                      <br/><b>Difficulty</b><br/>
                      <StarRatingComponent 
                          name={`${key}_difficulty`} 
                          starCount={5}
                          value={obj[key].difficulty}
                          onStarClick={() => {}}
                      />
                      <hr/>
                      <b>Responsibilities</b>
                      <div className="responsibilities">
                        {
                          data.responsibility.map((name,i) => {
                            return <span className={`responsibility responsibility_${name}`} key={i}>{name}</span>
                          })
                        }
                      </div>
                    </td>
                    <td>
                      <Tabs headers={['Description','Detail','Tips','Testing','Notes']}>
                        <Tab>
                          <div>
                            { description }<br/>
                            {
                              phases.map((phase,i) => {
                                if (data[phase] && this.state.checkValues.includes(phase)) {
                                  return (
                                    <div key={i}>
                                      <h3>
                                        <a href="https://macmillanlearning.atlassian.net/wiki/display/a11y/Macmillan+BLARs+and+WCAG+Guidelines" target="_new">BLAR Phase {i+1}</a>
                                      </h3>
                                      { data[phase] }
                                    </div>
                                  )
                                }
                              })
                            }
                          </div>
                        </Tab>
                        { 
                          [wuhcag_detail, wuhcag_tips, data.testing].map((html,i) => {
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
