import React, { Component } from 'react';

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
        <table>
          <tbody>
            { assessmentArray.map((item,i) => {
              return (
                <tr key={i}>
                  <td>
                    <a href={`/${item.shortId}`}>{item.title}</a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
