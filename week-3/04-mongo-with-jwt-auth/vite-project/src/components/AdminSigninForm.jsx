// Create a new component called AdminSignInForm.jsx
import React from 'react';

const AdminSignInForm = ({ credentials, onInputChange, onSignIn }) => {
  return (
    <div>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={onInputChange}
        />
      </label>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onInputChange}
          />
        </label>
      </div>
      <button onClick={onSignIn}>Sign In as Admin</button>
    </div>
  );
};

export default AdminSignInForm;
