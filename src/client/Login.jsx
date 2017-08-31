import React from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.props.signedIn? this.props.history.push("/") : null;
  }


  async handleLogin(e) {
    e.preventDefault();
    // console.log('hi is it here', e.target.username.value, e.target.password.value)
    // console.log('auth props:', this.props);
    await this.props.handleAuth(e.target.username.value, e.target.password.value, {type: 'login'});
    /*
    e.target.username.value
    e.target.password.value
    */
    /*
    an ajax post call to retrieve user data
    this.props.update
    */
  }


  render() {
    return (
      <div className="auth">
        <h1 className="login"> Welcome back! </h1>
        <form onSubmit={this.handleLogin}>
          <TextField className="username" name="username" type="text" hintText="username" /><br />
          <TextField className="password" name="password" type="text" hintText="password" /><br />
          <RaisedButton className="submit" label="Submit" type="submit" value="Log In"/>
        </form>
        <div>
        <p> Need an account? <Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);