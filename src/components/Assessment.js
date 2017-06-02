import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-tab-view';

import ChecklistItem from './ChecklistItem';
import FilterBar from './FilterBar';
import Details from './Details';
import DetailedReport from './reports/Detailed';
import SimpleReport from './reports/Simple';
import { customData, toolData } from '../data/customData.js';

import './App.css';
import wcag from '../data/wcag.json';

const filteredWcag = wcag.filter(ww => ww.conformance_level !== 'AAA');

const pageUrl = 'http://54.70.239.42';

const phases = [ 'phase1', 'phase2', 'phase3', 'phase4' ];

const filterList = [
  'onlyBLAR',
  'phase1', 'phase2', 'phase3', 'phase4',
  'dev', 'UX', 'production', 'editorial', 'live'
];
const offByDefault = [ 'phase2', 'phase3', 'phase4', 'live' ];
const defaultFilters = filterList.filter(el => offByDefault.indexOf(el) < 0);


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

  handleChange = (obj) => {
    const newStateObj = Object.assign({}, this.state, obj);
    this.setState(newStateObj);
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
    const { value:text, name } = e.target;
    const updatedOwners = {};
    updatedOwners[name] = text;
    this.setState({ owners: Object.assign({}, owners, updatedOwners) });
    this.saveTimer();
  }

  updateNotes = (e) => {
    const { notes } = this.state;
    const { value:text, name } = e.target;
    const updatedNotes = {};
    updatedNotes[name] = text;
    this.setState({ notes: Object.assign({}, notes, updatedNotes) });
    this.saveTimer();
  }

  toggleNotes = (e) => {
    // HACK This is a bit of a hack, modifies state in order to show textarea
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

  filtered = (item, data) => {

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
        <Details
          title={ title }
          shortId={ shortId }
          url={ url }
          onChange={ this.handleChange }
          onBlur={ this.saveTimer }
          team={ team }
          teams={ teams }
        />
        <FilterBar
          filterList={ filterList }
          onChange={ this.checkToggle }
          checkValues={ checkValues }
        />
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            {
              filteredWcag.map((item) => {
                const {
                  // title,
                  key,
                  description,
                  uri,
                  wuhcag_summary,
                  wuhcag_detail,
                  wuhcag_tips
                } = item;
                const data = customData(key, 'http://www.macmillanlearning.com/catalog');
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
                                    data.testing.checklist.map((check, i) => (
                                      <ChecklistItem
                                        title={ check }
                                        key={ i }
                                        itemIndex={ i }
                                        parentKey={ key }
                                        checkedItems={ checkedItems }
                                        notApplicable={ notApplicable }
                                        notes={ notes }
                                        owners={ owners }
                                        toggleNotes={ this.toggleNotes }
                                        checkToggle={ this.checkToggle }
                                        updateNotes={ this.updateNotes }
                                        cycleCheck={ this.cycleCheck }
                                        updateOwner={ this.updateOwner }
                                      />
                                    ))
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
        <hr />
        <SimpleReport
          reportCard={ reportCard }
          notApplicable={ notApplicable }
          checkValues={ checkValues }
        />
        <DetailedReport
          reportCard={ reportCard }
          notApplicable={ notApplicable }
          checkValues={ checkValues }
          owners={ owners }
          notes={ notes }
        />
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
