import React, { Component } from 'react';
import moment from 'moment';
import Team from './Team';
import NewAssessmentForm from './NewAssessmentForm';
import ES6Markdown from './ES6Markdown';
import { F, Row } from './shared';

import './App.css';

const pageUrl = 'http://54.70.239.42';

class Main extends Component {
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
      const sorted = res.docs.sort((a, b) => a.updatedAt < b.updatedAt);
      console.log("sorted", sorted);
      this.setState({
        assessmentArray: sorted,
        teams: res.teams
      });
    });
  }

  confirmDelete = (e) => {
    if (confirm('Are you sure you want to delete this assessment? Cannot be undone.')) {
      window.location.href = `${pageUrl}/api/delete/${e.target.value}`;
    }
  }

  render() {
    const { assessmentArray, teams } = this.state;
    return (
      <div className="App">
        <NewAssessmentForm
          pageUrl={ pageUrl }
          teams={ teams }
        />
        <table className="assessmentList">
          <thead>
            <tr>
              <th>Assessment Title</th>
              <th>Team</th>
              <th>Checked</th>
            </tr>
          </thead>
          <tbody>
            { assessmentArray.map((item, i) =>
              (
                <tr key={ i }>
                  <td>
                    <a href={ `/${item.shortId}` }>{item.title}</a>
                    <div className="updated">
                      Updated {moment(item.updatedAt).fromNow()}
                    </div>
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
                        >✔</a>
                      ))
                    }
                  </td>
                  <td>
                    <button value={ item._id } onClick={ this.confirmDelete }>x</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <Row className="intro">
          <F flex={ 3 }>
            <ES6Markdown fileName="/intro.md" />
          </F>
          <F flex={ 1 }>
            <h3>Teams</h3>
            <ul className="teamlist">
              { teams.map((team, t) =>
                <li key={ t }>{ team.name }</li>
              )}
            </ul>
            <Team />
          </F>
        </Row>
      </div>
    );
  }
}

export default Main;
