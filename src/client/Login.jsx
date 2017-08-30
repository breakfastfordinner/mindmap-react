import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const Login = () => (
  <div className="authContainer">
    <h1 className="signUp"> Welcome back! </h1>
    <TextField hintText="username"/><br />
    <TextField hintText="password"/><br />
    <RaisedButton label="Submit" />
    <p>Already registered? <Link to={'/signup'}>Sign up</Link></p>
  </div>
);

export default Login;
