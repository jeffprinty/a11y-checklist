import React, { Component } from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-tab-view';
import { string, number, array, func, object } from 'prop-types';

import { customData, toolData } from '../data/customData.js';

class AssessmentRow extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.checkValues.length !== this.props.checkValues.length;
  }

  isFiltered = (item, data) => {
    const { checkValues } = this.props;
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
    // if (show) this.props.addToReport(item);
    return show;
  }

  render() {
    const { item, checkValues } = this.props;
    const {
      key,
      description,
      uri,
      wuhcag_summary,
      wuhcag_detail,
      wuhcag_tips
    } = item;
    const data = customData(key, 'http://www.macmillanlearning.com/catalog');


    if (!this.isFiltered(item, data)) return null;


    // reportCard.push({ ...item, data });
    const noteLabel = typeof this.state.notes[key] !== 'undefined' ? 'Notes*' : 'Notes';
    return (
      <tr>
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
              { data.testing.checklist.length === 0
                ? <h2>No procedures added yet</h2>
                : <div>
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
                            <AssessmentRow
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
    
  }
};

AssessmentRow.propTypes = {
  checkValues: array.isRequired,
  title: string.isRequired,
  notApplicable: array.isRequired,
  notes: object.isRequired,
  owners: object.isRequired,
  cycleCheck: func.isRequired,
  updateNotes: func.isRequired,
  toggleNotes: func.isRequired,
  checkToggle: func.isRequired,
  updateOwner: func.isRequired
};

export default AssessmentRow;
