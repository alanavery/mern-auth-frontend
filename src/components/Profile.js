import React from 'react';

function Profile(props) {
  return (
    <div>
      <h2>Profile</h2>
      <ul>
        <li>Name: {props.user.name}</li>
        <li>Email: {props.user.email}</li>
      </ul>
    </div>
  );
}

export default Profile;
