import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const SignUp = () => (
  <div className="authContainer">
    <h1 className="signUp"> Create an Account </h1>
    <TextField hintText="username"/><br />
    <TextField hintText="password"/><br />
    <RaisedButton label="Submit" />
    <p>Already registered? <Link to={'/login'}>Sign in</Link></p>
  </div>
);

export default SignUp;
