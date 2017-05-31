import React from 'react';

const pageUrl = 'http://54.70.239.42';
let teamName;
let teamButton;

const createTeam = (e) => {
  e.preventDefault();
  fetch(`${pageUrl}/api/team/new`, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: teamName.value })
  }).then((res) => {
    if (res.status === 200) {
      teamButton.value = `Team Created: ${teamName.value}`;
      teamName.value = '';
    }
  }).catch(err => console.log(err));
};

const focusInput = () => {
  teamButton.value = 'Create Team';
};

const Team = () => (
  <form id="teamForm" onSubmit={ createTeam }>
    <h3>Create New Team</h3>
    <label htmlFor="newTeam">New Team Name</label><br />
    <input id="teamName" type="text" name="name" onFocus={ focusInput } ref={ el => teamName = el } /><br />
    <input id="submit" type="submit" value="Create Team" ref={ el => teamButton = el } />
  </form>
  );

export default Team;
