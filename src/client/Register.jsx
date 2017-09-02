import React from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.signedIn ? this.props.history.push("/") : null;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleRegister(e) {
    e.preventDefault();
    await this.props.handleAuth(this.state.username, this.state.password, {type: 'register'});
  }

  render() {
    return (
      <div className="auth">
        <h1 className="register"> Create An Account </h1>
        <TextField
          name="username"
          type="text"
          hintText="username"
          value={this.state.username}
          onChange={this.handleChange}/>
        <br />
        <TextField
          name="password"
          type="text"
          hintText="password"
          onChange={this.handleChange}
          value={this.state.password}/>
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          onClick={ this.handleRegister } />
        <p> Already registered?<Link to="/login">Login</Link></p>
      </div>
    )
  }
}

export default withRouter(Register);
