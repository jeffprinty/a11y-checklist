import React from 'react';
import TeamSelect from './TeamSelect';
import { F, Row } from './shared';

const NewAssessmentForm = ({ pageUrl, teams }) => (
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
);

export default NewAssessmentForm;
