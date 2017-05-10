import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-tab-view';
import StarRatingComponent from 'react-star-rating-component';

import { customData, toolData } from './customData.js';

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

const Count = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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

const checkValuesList = [
  'onlyBLAR',
  'phase1',
  'phase2',
  'phase3',
  'phase4',
  'dev',
  'UX',
  'content',
  'media',
  'live'
];
const defaultOff = [];//['phase2','phase3','phase4','live'];

const defaultState = checkValuesList.filter(el => defaultOff.indexOf(el) < 0)

const cap = (txt) => {
  return txt.charAt(0).toUpperCase() + txt.slice(1,txt.length)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkValues: defaultState,
      title: 'Untitled a11y Assessment',
      url: 'http://www.macmillanlearning.com/catalog',
      shortId: 'BJCCEAJgZ'
    }
  }

  checkToggle = (e) => {
    let checked;
    const node = document;
    checked = node.querySelectorAll('input[type="checkbox"]:checked');
    const checkValues =  Array.prototype.map.call(checked, function (e) {return e.value;});
    this.setState({ checkValues });
  }
  update = (id) => {
    const { checkValues, title, url, shortId } = this.state;
    const data = {
      checkValues, title, url
    };

    fetch(`./api/update/${shortId}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => console.log(res))
  }

  render() {
    const { shortId, checkValues, title, url } = this.state;
    let count = 0;

    let reportCard = [];


    return (
      <div className="App">
        <img alt="Narwa11y 'Wally' logo, a rainbow colored narwhal with glasses" className="logo" src="./narwha11y.png" />
        <h1 className="pageTitle">Narwha11y: Accessibility Assessment Tool</h1>
        <div className="inputs">
          <input
            className="bigInput"
            type="text"
            value={ title }
            onChange={e => this.setState({title: e.target.value})} />
          <input
            className="bigInput"
            type="text"
            value={ url }
            onChange={e => this.setState({url: e.target.value})} />
        </div>
        <input
          type="text"
          value={ shortId }
          onChange={e => this.setState({shortId: e.target.value})} />
        <div className="checkBar">
          <strong>Filters: </strong>
          {
            checkValuesList.map((item,i) => {
              return (
                <StyledCheckbox className="styledCheckbox" key={i}>
                  <input
                    id={`${item}_checkbox`}
                    name={ item }
                    type="checkbox"
                    checked={ checkValues.includes(item) }
                    onChange={ this.checkToggle.bind(this) }
                    value={item} />
                  <span className="check" />
                  <label htmlFor={`${item}_checkbox`}>{ cap(item) }</label>
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
                  wuhcag_tips
                } = item;
                const data = customData(key,'http://www.macmillanlearning.com/catalog');
                if (conformance_level === "AAA") return null;

                let show = false;

                const filterableFields = Object.keys(data).filter(key => {
                  return /^phase/.test(key);
                });

                const filterables = filterableFields.concat(data.responsibility);

                filterables.forEach(rr => {
                  if (checkValues.includes(rr)) {
                    show = true
                  }
                })
                
                if ( checkValues.includes('onlyBLAR') ) {
                  // No phases in item
                  if (filterableFields.length === 0) return null;
                  // Item has phases but should be filtered
                  let showPhase = false;
                  filterableFields.forEach(phase => {
                    if ( checkValues.includes(phase) ) {
                      showPhase = true
                    }
                  })
                  show = showPhase
                }

                if (!show) return null;

                reportCard.push({...item, data});

                count++;
                return (
                  <tr key={ key }>
                    <td className="left">
                      <a name={ key } />
                      <h2>
                        <a href={ uri } target="_new">{key}</a>
                      </h2>
                      <div className="summary">
                        {wuhcag_summary}
                      </div>
                      <hr/>
                      <div className="hidden">
                        <b>Compliance</b><br/>
                        <StarRatingComponent 
                            name={`${key}_compliance`} 
                            starCount={5}
                            value={2}
                            onStarClick={() => {}}
                        />
                        <br/><b>Difficulty</b><br/>
                        <StarRatingComponent 
                            name={`${key}_difficulty`} 
                            starCount={5}
                            value={3}
                            onStarClick={() => {}}
                        />
                        <hr/>
                      </div>
                      <b>Tools</b>
                      <div className="tags">
                        {
                          data.testing.tools.map((tool,i) => {
                            return <span className={`tag tag_${tool}`} key={i}>{tool}</span>
                          })
                        }
                      </div>
                      <b>Responsibilities</b>
                      <div className="tags">
                        {
                          filterableFields.concat(data.responsibility).map((name,i) => {
                            return <span className={`tag tag_${name}`} key={i}>{name}</span>
                          })
                        }
                      </div>
                    </td>
                    <td>
                      <Tabs
                        defaultIndex={2}
                        headers={['Testing','Details','Tips','Notes']}>
                        <Tab>
                          <div>
                            { data.testing.description }
                            <table className="checklist">
                              <tbody>
                                {
                                  data.testing.checklist.map((check,i) => {
                                    return (
                                      <tr key={i}>
                                        <td className="checkbox">
                                          <input
                                            id={`checklist_${key}_${i}`}
                                            onChange={this.checkToggle.bind(this)}
                                            value={`${key}_${i}`}
                                            type="checkbox"/>
                                        </td>
                                        <td>
                                          <label
                                            htmlFor={`checklist_${key}_${i}`}
                                            dangerouslySetInnerHTML={{ __html: check }} />
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                            { data.testing.tools.length > 0 &&
                              <div>
                                <b>Tools: </b>
                                {
                                  data.testing.tools.map((tool,i) => {
                                    return <a href={toolData[tool].url} key={i}>{ tool }</a>
                                  })
                                }
                              </div>
                            }
                          </div>
                        </Tab>
                        <Tab>
                          <div>
                            { description }<br/>
                            <div className="references">
                              {
                                item.references.map((ref,i) => {
                                  return <a key={i} href={ref.url} target="_new">{ref.title}</a>
                                })
                              }
                            </div>
                            {
                              phases.map((phase,i) => {
                                if (data[phase] && checkValues.includes(phase)) {
                                  return (
                                    <div key={i}>
                                      <h3>
                                        <a href="https://macmillanlearning.atlassian.net/wiki/display/a11y/Macmillan+BLARs+and+WCAG+Guidelines" target="_new">BLAR Phase {i+1}</a>
                                      </h3>
                                      <div dangerouslySetInnerHTML={{__html: data[phase] }} />
                                    </div>
                                  )
                                } else return null
                              })
                            }
                          </div>
                        </Tab>
                          <Tab>
                            <div>
                              { 
                                [wuhcag_detail, wuhcag_tips].map((html,i) => {
                                  return (
                                    <div key={i} dangerouslySetInnerHTML={{__html: html }} />
                                  )
                                })
                              }
                            </div>
                          </Tab>
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
        <div>
        </div>
        <Count>{ count } items</Count>
        <button onClick={ this.update }>Update</button>
        <h3>Report Card</h3>
        <table className="output">
          <thead>
            <tr>
              <th>Section</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              reportCard.map((item,i) => {
                return (
                  <tr key={i}>
                    <td>
                      {item.key} - {item.wuhcag_summary}
                    </td>
                    <td>
                      {
                        item.data.testing.checklist.map((check,i) => {
                          const key = `${item.key}_${i}`;
                          const isChecked = this.state.checkValues.includes(key);
                          return (
                            <a key={i} href={`#${item.key}`} title={check.replace(/<(?:.|\n)*?>/gm, '')}>
                              { isChecked ? '✔' : '✖️' }
                            </a>
                          )
                        })
                      }
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
