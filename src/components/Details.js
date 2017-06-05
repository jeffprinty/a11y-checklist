import React from 'react';
import { string, func, array } from 'prop-types';

import TeamSelect from './TeamSelect';

const Details = ({ shortId, title, url, onChange, onBlur, team, teams }) => (
  <div className="assessmentDetails">
    <div className="flexRow">
      <label htmlFor="titleInput">Title</label>
      <input type="hidden" value={ shortId } />
      <input
        className="bigInput wide"
        id="titleInput"
        type="text"
        value={ title }
        onBlur={ onBlur }
        onChange={ e => onChange({ title: e.target.value }) }
      />
      <label htmlFor="teamSelect">Team</label>
      <TeamSelect
        onBlur={ onBlur }
        onChange={ e => onChange({ team: e.target.value }) }
        value={ team }
        teams={ teams }
      />
    </div>
    <div className="flexRow">
      <label htmlFor="urlInput">URL</label>
      <input
        className="bigInput wide"
        id="urlInput"
        type="text"
        value={ url }
        onBlur={ onBlur }
        onChange={ e => onChange({ url: e.target.value }) }
      />
    </div>
  </div>
);

Details.propTypes = {
  shortId: string.isRequired,
  title: string.isRequired,
  url: string.isRequired,
  team: string.isRequired,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  teams: array.isRequired
};

export default Details;
