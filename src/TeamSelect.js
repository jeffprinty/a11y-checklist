import React from 'react';
import { array, func, string } from 'prop-types';

const TeamSelect = ({ teams, onChange, onBlur, value }) => {
  return (
    <select
      value={ value }
      onBlur={ onBlur }
      onChange={ onChange }
      name="team"
      id="teamSelect"
    >
      <option>Select Team:</option>
      {
        teams.map((teamData, i) => (
          <option key={ i } value={ teamData.name }>
            { teamData.name }
          </option>
        ))
      }
    </select>
  );
};

TeamSelect.propTypes = {
  teams: array.isRequired,
  onChange: func,
  onBlur: func,
  value: string
};

export default TeamSelect;
