import React, { Component } from 'react';
import moment from 'moment';
import Team from './Team';

import './App.css';
const pageUrl = 'http://54.70.239.42';

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentArray: []
    }
  }


  componentDidMount() {
    fetch(`${pageUrl}/api`, {
      method: 'get'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({assessmentArray: res});
    })
  }

  render() {
    const { assessmentArray } = this.state;
    return (
      <div className="App">
        <table className="assessmentList">
          <thead>
            <tr>
              <th>Assessment Title</th>
              <th>Team</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            { assessmentArray.map((item,i) => {
              console.log(item.updatedAt);
              return (
                <tr key={i}>
                  <td>
                    <a href={`/${item.shortId}`}>{item.title}</a>
                  </td>
                  <td>
                    {item.team}
                  </td>
                  <td>
                    {moment(item.updatedAt).fromNow()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Team />
      </div>
    );
  }
}

export default List;
