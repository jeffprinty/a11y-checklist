import React from 'react';
import styled from 'styled-components';
import { string, array } from 'prop-types';

import TeamSelect from './TeamSelect';
import { F, Row } from './shared';

const Form = styled.form`
  background-color: #45a5b5;
  button {
    background-color: #00758E;
    border-radius: 0;
  }
  button:hover {
    background-color: #a2d6dd;
  }
`;

const NewAssessmentForm = ({ pageUrl, teams }) => (
  <Form action={ `${pageUrl}/api/create` } method="post">
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
      <F flex={ 1 }>
        <TeamSelect teams={ teams } />
      </F>
      <F flex={ 1 }>
        <button>Create New Assessment</button>
      </F>
    </Row>
  </Form>
);

NewAssessmentForm.propTypes = {
  pageUrl: string.isRequired,
  teams: array.isRequired
};

export default NewAssessmentForm;
