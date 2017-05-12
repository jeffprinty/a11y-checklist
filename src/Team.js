import React from 'react';

const pageUrl = 'http://54.70.239.42';
let teamName;

const createTeam = (e) => {
  e.preventDefault();
  console.log(teamName);
  fetch(`${pageUrl}/api/team/new`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: teamName.value})
  }).then(res => console.log(res)).catch(err => console.log(err))
}


const Team = () => {
  return (
    <form id="teamForm" onSubmit={createTeam}>
      <label htmlFor="newTeam">New Team Name</label>
      <input id="teamName" type="text" name="name" ref={ el => teamName = el } />
      <input id="submit" type="submit" value="Create Team" />
    </form>
  )
}

export default Team;
