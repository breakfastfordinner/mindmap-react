import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('registers props:', this.props)
    console.log('hi is it here', e.target.username.value, e.target.password.value)
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
      <div>
        <h1 className="login"> Create An Account </h1>
        <form onSubmit={this.handleSubmit}>
          <TextField className="username" name="username" type="text" hintText="username" /><br />
          <TextField className="password" name="password" type="text" hintText="password" /><br />
          <RaisedButton className="submit" label="Submit" type="submit" value="Log In"/>
        </form>
        <div>
        <p>Already registered? <Link to="/login">Login</Link></p>
        </div>
      </div>
    )
  }
}

export default withRouter(Register);
