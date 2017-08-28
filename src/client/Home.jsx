import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import signUp from './signUp.jsx';

        // <Link to="/signup" component={signUp}</Link>

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maps: [{
        id: '1234qwer', 
        name: 'test1'
      }, 
      { 
        id: '5678asdf',
        name: 'test2'
      }, 
      {
        id: '9999qqqq',
        name: 'test3'
      }]
    }
  }

  

  render() {
    return (
      <div>
        home page here?
      </div>
    )
  }
}

export default Home;