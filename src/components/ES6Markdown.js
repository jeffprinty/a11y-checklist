import React, { Component } from 'react';
import { string } from 'prop-types';
import marked from 'marked';
import styled from 'styled-components';

const MarkdownDisplay = styled.div`
  p, h2 {
    margin-bottom: 1em;
  }
`;

class ES6Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      md: ''
    };
  }
  componentDidMount() {
    fetch(this.props.fileName)
      .then(res => res.text())
      .then((text) => {
        this.setState({
          md: marked(text)
        });
      });
  }
  render() {
    const { md } = this.state;
    return (
      <MarkdownDisplay dangerouslySetInnerHTML={{ __html: md }} />
    );
  }
}


ES6Markdown.propTypes = {
  fileName: string.isRequired
};

export default ES6Markdown;
