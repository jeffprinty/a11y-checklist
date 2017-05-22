import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-tab-view';
import StarRatingComponent from 'react-star-rating-component';
import '../node_modules/react-accessible-accordion/dist/react-accessible-accordion.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import Trinary from './Trinary';
import { customData, toolData } from './customData.js';

import './App.css';
import wcag from '../public/wcag.json';

const pageUrl = 'http://54.70.239.42';

const StyledCheckbox = styled.span`
  min-width: 20px;
  position: relative;
  height: 25px;
  line-height: 20px;

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
    min-width: 70px;
    height: 36px;
    position: absolute;
    z-index: 999;
    &:checked + span:after {
      opacity: 1;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const F = styled.div`
  flex: ${props => props.flex}
`;
const ChecklistRow = styled.tr`
  opacity: ${props => props.notApplicable ? '0.3' : 1};
`;

const phases = [ 'phase1', 'phase2', 'phase3', 'phase4' ];

const filterList = [
  'onlyBLAR',
  'phase1',
  'phase2',
  'phase3',
  'phase4',
  'dev',
  'UX',
  'production',
  'editorial',
  'live'
];
const defaultOff = [];// ['phase2','phase3','phase4','live'];

const defaultFilters = filterList.filter(el => defaultOff.indexOf(el) < 0);

const cap = txt => txt.charAt(0).toUpperCase() + txt.slice(1, txt.length);

let saveTimeout;

class Main extends Component {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const shortId = pathname.replace(/\//ig, '');
    this.state = {
      status: '',
      saveStatus: true,
      checkValues: defaultFilters,
      notApplicable: [],
      checkedItems: [],
      checkedFilters: [],
      title: 'New Assessment',
      url: 'http://www.macmillanlearning.com/catalog',
      team: '',
      shortId,
      owners: {},
      notes: {},
      teams: [
        { name: 'teamA' },
        { name: 'teamB' }
      ]
    };
  }
  componentDidMount() {
    const { pathname } = this.props.location;
    fetch(`${pageUrl}/api${pathname}`, {
      method: 'get'
    })
    .then(res => res.json())
    .then((res) => {
      this.setState(res);
    }).catch((err) => {
      this.setState({ status: `Error: ${err}` });
    });
  }

  checkToggle = () => {
    const node = document;
    const checkedFilterElements = node.querySelectorAll('.checkBar input[type="checkbox"]:checked');
    const checkedFilters = Array.prototype.map.call(checkedFilterElements, e => e.value);

    const checkedChecklistElements = node.querySelectorAll('.checklist input[type="checkbox"]:checked');
    const checkedItems = Array.prototype.map.call(checkedChecklistElements, e => e.value);

    const checked = node.querySelectorAll('input[type="checkbox"]:checked');
    const checkValues = Array.prototype.map.call(checked, e => e.value);
    this.setState({ checkValues, checkedItems, checkedFilters });
    this.saveTimer();
  }

  cycleCheck = (el) => {
    const { checkedItems:checked, notApplicable:na } = this.state;
    let checkedItems = checked;
    let notApplicable = na;
    if (!checkedItems.concat(notApplicable).includes(el)) {
      checkedItems.push(el);
    } else if (checkedItems.includes(el)) {
      checkedItems = checkedItems.filter(item => item !== el);
      notApplicable.push(el);
    } else if (notApplicable.includes(el)) {
      notApplicable = notApplicable.filter(item => item !== el);
    }
    this.setState({ checkedItems, notApplicable });
    this.saveTimer();
  }

  updateOwner = (e) => {
    const { owners } = this.state;
    const text = e.target.value;
    const name = e.target.name;
    const updatedOwners = {};
    updatedOwners[name] = text;
    this.setState({ owners: Object.assign({}, owners, updatedOwners) });
    this.saveTimer();
  }

  updateNotes = (e) => {
    const { notes } = this.state;
    const text = e.target.value;
    const name = e.target.name;
    const updatedNotes = {};
    updatedNotes[name] = text;
    this.setState({ notes: Object.assign({}, notes, updatedNotes) });
    this.saveTimer();
  }

  toggleNotes = (e) => {
    this.setState({ notes: Object.assign({}, this.state.notes, { [e.target.name]: '' }) });
  }

  saveTimer = () => {
    clearTimeout(saveTimeout);
    this.setState({ saveStatus: false });
    saveTimeout = setTimeout(() => {
      this.update();
    }, 10000);
  }

  update = () => {
    const { shortId } = this.state;
    const data = {
      ...this.state,
      updatedAt: Date.now()
    };
    fetch(`${pageUrl}/api/update/${shortId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        this.setState({ status: 'updated successfully', saveStatus: true });
      } else {
        this.setState({ status: `error: ${res.status}` });
      }
    }).catch((err) => {
      this.setState({ status: `error: ${err}` });
    });
  }

  render() {
    const {
      status, shortId, checkValues, notApplicable,
      checkedItems, title, url,
      team, teams, owners, notes,
      saveStatus
    } = this.state;
    let count = 0;

    const reportCard = [];
    return (
      <div className="App">
        <div className="assessmentDetails">
          <div className="flexRow">
            <label htmlFor="titleInput">Title</label>
            <input type="hidden" value={ shortId } />
            <input
              className="bigInput wide"
              id="titleInput"
              type="text"
              value={ title }
              onBlur={ this.saveTimer }
              onChange={ e => this.setState({ title: e.target.value }) }
            />
            <label htmlFor="teamSelect">Team</label>
            <select
              value={ team }
              onBlur={ this.saveTimer }
              onChange={ e => this.setState({ team: e.target.value }) }
              id="teamSelect"
            >
              <option>Select Team:</option>
              {
                teams.map((teamData, i) => (
                  <option key={ i } value={ teamData.name }>
                    { teamData.name }
                  </option>
                ))
              }
            </select>
          </div>
          <div className="flexRow">
            <label htmlFor="urlInput">URL</label>
            <input
              className="bigInput wide"
              id="urlInput"
              type="text"
              value={ url }
              onBlur={ this.saveTimer }
              onChange={ e => this.setState({ url: e.target.value }) }
            />
          </div>
        </div>
        <div className="checkBar">
          <strong>Filters: </strong>
          {
            filterList.map((item, i) => (
              <StyledCheckbox className="styledCheckbox" key={ i }>
                <input
                  id={ `${item}_checkbox` }
                  name={ item }
                  type="checkbox"
                  checked={ checkValues.includes(item) }
                  onChange={ this.checkToggle.bind(this) }
                  value={ item }
                />
                <span className="check" />
                <label htmlFor={ `${item}_checkbox` }>{ cap(item) }</label>
              </StyledCheckbox>
              ))
          }
        </div>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            {
              wcag.map((item) => {
                const {
                  // title,
                  key,
                  description,
                  uri,
                  conformance_level,
                  wuhcag_summary,
                  wuhcag_detail,
                  wuhcag_tips
                } = item;
                const data = customData(key, 'http://www.macmillanlearning.com/catalog');
                if (conformance_level === 'AAA') return null;

                let show = false;

                const filterableFields = Object.keys(data).filter(keyToFilter => /^phase/.test(keyToFilter));

                const filterables = filterableFields.concat(data.responsibility);

                filterables.forEach((rr) => {
                  if (checkValues.includes(rr)) {
                    show = true;
                  }
                });

                if (checkValues.includes('onlyBLAR')) {
                  // No phases in item
                  if (filterableFields.length === 0) return null;
                  // Item has phases but should be filtered
                  let showPhase = false;
                  filterableFields.forEach((phase) => {
                    if (checkValues.includes(phase)) {
                      showPhase = true;
                    }
                  });
                  show = showPhase;
                }

                if (!show) return null;

                reportCard.push({ ...item, data });

                const noteLabel = typeof this.state.notes[key] !== 'undefined' ? 'Notes*' : 'Notes';

                count += 1;
                return (
                  <tr key={ key }>
                    <td className="left">
                      <h2>
                        <a name={ key } href={ uri } target="_new">{key}</a>
                      </h2>
                      <div className="summary">
                        { wuhcag_summary }
                      </div>
                      <hr />
                      <div className="hidden">
                        <b>Compliance</b><br />
                        <StarRatingComponent
                          name={ `${key}_compliance` }
                          starCount={ 5 }
                          value={ 2 }
                          onStarClick={ () => {} }
                        />
                        <br /><b>Difficulty</b><br />
                        <StarRatingComponent
                          name={ `${key}_difficulty` }
                          starCount={ 5 }
                          value={ 3 }
                          onStarClick={ () => {} }
                        />
                        <hr />
                      </div>
                      <b>Responsibilities</b>
                      <div className="tags">
                        {
                          filterableFields.concat(data.responsibility).map((name, i) => <span className={ `tag tag_${name}` } key={ i }>{name}</span>)
                        }
                      </div>
                      { data.testing.tools.length > 0 &&
                        <div>
                          <hr />
                          <b>Tools</b>
                          <div className="tags">
                            {
                              data.testing.tools.map((tool, i) => (
                                <span
                                  className={ `tag tag_${tool}` }
                                  key={ i }
                                >
                                  {tool}
                                </span>
                              ))
                            }
                          </div>
                        </div>
                      }
                    </td>
                    <td>
                      <Tabs
                        defaultIndex={ 2 }
                        headers={ [ 'Testing', 'Baseline', 'Tips', noteLabel ] }
                      >
                        <Tab>
                          { data.testing.checklist.length === 0 ? <h2>No procedures added yet</h2> :
                          <div>
                            <h2>Testing Procedures</h2>
                            { data.testing.description }
                            <table className="checklist">
                              <thead>
                                <tr>
                                  <td colSpan="3">Task</td>
                                  <td>Owner</td>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    data.testing.checklist.map((check, i) => {
                                      const hasNote = typeof notes[`${key}_${i}`] !== 'undefined';
                                      return (
                                        <ChecklistRow key={ i } notApplicable={ notApplicable.includes(`${key}_${i}`) }>
                                          <td className="checkbox">
                                            <div className="hidden">
                                              <input
                                                id={ `checklist_${key}_${i}` }
                                                checked={ checkedItems.includes(`${key}_${i}`) }
                                                onChange={ this.checkToggle.bind(this) }
                                                value={ `${key}_${i}` }
                                                type="checkbox"
                                              />
                                            </div>
                                            <Trinary
                                              title={ `${key}_${i}` }
                                              onClick={ this.cycleCheck }
                                              index={ i }
                                              checked={ checkedItems.includes(`${key}_${i}`) }
                                              indeterminate={ notApplicable.includes(`${key}_${i}`) }
                                            />
                                          </td>
                                          <td>
                                            <a name={ `${key}_${i}` }>
                                              <label
                                                htmlFor={ `checklist_${key}_${i}` }
                                                dangerouslySetInnerHTML={{ __html: check }}
                                              />
                                            </a>
                                            { hasNote &&
                                              <div className="notesWrap">
                                                <u>{ `${key}_${i} Notes` }</u>
                                                <textarea
                                                  name={ `${key}_${i}` }
                                                  value={ notes[`${key}_${i}`] }
                                                  onChange={ this.updateNotes.bind(this) }
                                                />
                                              </div>
                                            }
                                          </td>
                                          <td className="notes">
                                            <button
                                              name={ `${key}_${i}` }
                                              title="Show notes for this task"
                                              className="noteButton"
                                              onClick={ this.toggleNotes.bind(this) }
                                            />
                                          </td>
                                          <td className="owner">
                                            <input
                                              type="text"
                                              title="Who is taking ownership?"
                                              name={ `${key}_${i}` }
                                              value={ owners[`${key}_${i}`] }
                                              onChange={ this.updateOwner.bind(this) }
                                            />
                                          </td>
                                        </ChecklistRow>
                                      );
                                    })
                                  }
                              </tbody>
                            </table>
                            { data.testing.tools.length > 0 &&
                            <div>
                              <b>Tools: </b>
                              {
                                data.testing.tools.map((tool, i) => (
                                  <a
                                    className="toolLink"
                                    href={ toolData[tool].url }
                                    target="_new"
                                    key={ i }
                                  >
                                    { tool }
                                  </a>
                                ))
                              }
                            </div>
                              }
                          </div>
                          }
                        </Tab>
                        <Tab>
                          <div>
                            { description }<br />
                            <div className="references">
                              {
                                item.references.map((ref, i) => <a key={ i } href={ ref.url } target="_new">{ref.title}</a>)
                              }
                            </div>
                            {
                              phases.map((phase, i) => {
                                if (data[phase] && checkValues.includes(phase)) {
                                  return (
                                    <div key={ i }>
                                      <h3>
                                        <a href="https://macmillanlearning.atlassian.net/wiki/display/a11y/Macmillan+BLARs+and+WCAG+Guidelines" target="_new">BLAR Phase {i + 1}</a>
                                      </h3>
                                      <div dangerouslySetInnerHTML={{ __html: data[phase] }} />
                                    </div>
                                  );
                                } return null;
                              })
                            }
                          </div>
                        </Tab>
                        <Tab>
                          <div>
                            {
                                [ wuhcag_detail, wuhcag_tips ].map((html, i) => (
                                  <div key={ i } dangerouslySetInnerHTML={{ __html: html }} />
                                  ))
                              }
                          </div>
                        </Tab>
                        <Tab>
                          <textarea
                            name={ `${key}` }
                            value={ notes[`${key}`] }
                            onChange={ this.updateNotes.bind(this) }
                          />
                        </Tab>
                      </Tabs>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <span>{ count } items</span>
        <button onClick={ this.update }>{ saveStatus ? 'Saved' : 'Save' }</button>
        <span className="status">{ status }</span>
        <div className="reportCard">
          <h3>Report Card</h3>
          <Accordion accordion={ false }>
            {
              reportCard.map((item, i) => (
                <AccordionItem expanded key={ i }>
                  <AccordionItemTitle className="accordionTitle">
                    <Row>
                      <F flex={ 3 }>
                        <h3>{item.key} - {item.wuhcag_summary}</h3>
                      </F>
                      <F flex={ 1 }>
                        {
                          item.data.testing.checklist.map((check, q) => {
                            const key = `${item.key}_${q}`;
                            const nA = this.state.notApplicable.includes(key);
                            const isChecked = this.state.checkValues.includes(key);
                            return (
                              <a key={ q } href={ `#${item.key}` } title={ check.replace(/<(?:.|\n)*?>/gm, '') }>
                                { !nA && isChecked ? '✔' : '✖️' }
                                { nA && '➖' }
                              </a>
                            );
                          })
                        }
                      </F>
                    </Row>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <table className="reportTable">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>*</th>
                          <th>Owner</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          item.data.testing.checklist.map((check, q) => {
                            const key = `${item.key}_${q}`;
                            const nA = this.state.notApplicable.includes(key);
                            const isChecked = this.state.checkValues.includes(key);
                            return (
                              <tr key={ q }>
                                <td className="title">
                                  <a key={ q } href={ `#${item.key}` } title={ check.replace(/<(?:.|\n)*?>/gm, '') }>
                                    { check.replace(/<(?:.|\n)*?>/gm, '') }
                                  </a>
                                </td>
                                <td className="status">
                                  { !nA && isChecked ? '✔' : '✖️' }
                                  { nA && '➖' }
                                </td>
                                <td className="owner">
                                  { owners[key] }
                                </td>
                                <td className="notes">
                                  { notes[`${item.key}_${q}`] }
                                </td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </table>
                  </AccordionItemBody>
                </AccordionItem>
              ))
            }
          </Accordion>
        </div>
        <table className="output">
          <thead>
            <tr>
              <th>Section</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              reportCard.map((item, i) => (
                <tr key={ i }>
                  <td>
                    {item.key} - {item.wuhcag_summary}
                  </td>
                  <td>
                    {
                      item.data.testing.checklist.map((check, q) => {
                        const key = `${item.key}_${q}`;
                        const nA = this.state.notApplicable.includes(key);
                        const isChecked = this.state.checkValues.includes(key);
                        return (
                          <a key={ q } href={ `#${item.key}` } title={ check.replace(/<(?:.|\n)*?>/gm, '') }>
                            { !nA && isChecked ? '✔' : '✖️' }
                            { nA && '➖' }
                          </a>
                        );
                      })
                    }
                  </td>
                </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default Main;
