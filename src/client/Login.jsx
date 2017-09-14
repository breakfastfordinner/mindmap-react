import React from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  link: {
    textDecoration: 'none',
    color: '#FF9800'
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      requiredUsername: '',
      requiredPassword: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.props.signedIn ? this.props.history.push("/") : null;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleLogin(e) {
    e.preventDefault();
    if (this.state.password === '' && this.state.username === '') {
      this.setState({
        requiredUsername: 'This field is required.',
        requiredPassword: 'This field is required.'
      })
    } else if (this.state.username === '') {
      this.setState({
        requiredUsername: 'This field is required.',
        requiredPassword: ''
      })
    } else if (this.state.password === '') {
      this.setState({
        requiredUsername: '',
        requiredPassword: 'This field is required.'
      })

    } else {
      this.setState({
        requiredPassword: '',
        requiredUsername: ''
      })
      await this.props.handleAuth(this.state.username, this.state.password, {type: 'login'});
    }
  }

  render() {
    return (
      <div className="auth">
        <h1 className="login"> Welcome back! </h1>
        <TextField
          name="username"
          type="text"
          hintText="username"
          value={this.state.username}
          errorText={this.state.requiredUsername}
          onChange={this.handleChange}/>
        <br />
        <TextField
          name="password"
          type="password"
          hintText="password"
          errorText={this.state.requiredPassword}
          onChange={this.handleChange}
          value={this.state.password}/>
        <br />
        <RaisedButton
          className='submitButton'
          label="Submit"
          primary={true}
          onClick={ this.handleLogin } />
        <p> Need an account? <Link style={styles.link} to="/register">Sign Up</Link></p>
      </div>
    )
  }
}

export default withRouter(Login);
