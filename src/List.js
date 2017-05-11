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
      console.log("res", res);
      this.setState({assessmentArray: res});
    })
  }

  render() {
    const { assessmentArray } = this.state;
    return (
      <div className="App">
        <ul>
          { assessmentArray.map((item,i) => {
            return (
              <li>
                <a href={`/${item.shortId}`}>{item.title}</a>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default List;
