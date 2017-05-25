import React, { Component } from 'react';
import moment from 'moment';
import Team from './Team';
import TeamSelect from './TeamSelect';
import { F, Row } from './shared';

import './App.css';

const pageUrl = 'http://54.70.239.42';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentArray: [],
      teams: []
    };
  }


  componentDidMount() {
    fetch(`${pageUrl}/api`, {
      method: 'get'
    })
    .then(res => res.json())
    .then((res) => {
      this.setState({
        assessmentArray: res.docs,
        teams: res.teams
      });
    });
  }

  render() {
    const { assessmentArray, teams } = this.state;
    return (
      <div className="App">
        <form id="createWithData" action={ `${pageUrl}/api/create` } method="post">
          <Row>
            <F flex={ 3 }>
              <label style={{ display: 'none' }}htmlFor="urlInput">URL:</label>
              <input
                className="wideUrl"
                placeholder="Enter a URL"
                id="urlInput"
                type="text"
                name="url"
                title="Enter a URL for assessment"
              />
            </F>
            <F flex={1}>
              <TeamSelect teams={ teams } />
            </F>
            <F flex={1}>
              <button>Create New Assessment</button>
            </F>
          </Row>
        </form>
        <table className="assessmentList">
          <thead>
            <tr>
              <th>Assessment Title</th>
              <th>Team</th>
              <th>Checked</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            { assessmentArray.map((item, i) => {
              return (
                <tr key={ i }>
                  <td>
                    <a href={ `/${item.shortId}` }>{item.title}</a>
                  </td>
                  <td>
                    {item.team}
                  </td>
                  <td>
                    {
                      item.checkedItems.map((check, index) => (
                        <a
                          key={ index }
                          className="check"
                          href={ `/${item.shortId}#${check}` }
                        >
                          ✔
                        </a>
                      ))
                    }
                  </td>
                  <td>
                    {moment(item.updatedAt).fromNow()}
                  </td>
                  <td>
                    <a href={ `${pageUrl}/api/delete/${item._id}` }>x</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Row className="intro">
          <F flex={ 3 }>
            <h2>Narwha11y introduction</h2>
            <p>
              Philosophy: We need a way to track progress on a11y remediation
              efforts. Instead of just pointing teams to the full WCAG and
              having them figure it out on their own, which results in many
              disparate implementations, it would be better to have a
              centralized tool for assessing the remediation progress.
              To that end I built Narwha11y, a persistent a11y assessment
              checklist tool. It combines the WCAG 2.0 AA and the
              Macmillan Baseline Accessibility Requirements into a
              filterable persistent checklist so teams can create and
              update their a11y assessments, going through each phase
              of the BLAR on their way to accessibility.
            </p>
          </F>
          <F flex={ 1 }>
            <Team />
            <ul className="teamlist">
              {
                teams.map((team, t) =>
                  <li key={ t }>{ team.name }</li>
                )
              }
            </ul>
          </F>
        </Row>
      </div>
    );
  }
}

export default List;
