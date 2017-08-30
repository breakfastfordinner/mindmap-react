import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
// import signUp from './signUp.jsx';

        // <Link to="/signup" component={signUp}</Link>

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maps: [{
        id: '1234qwer', 
        name: 'Map1'
      }, 
      { 
        id: '5678asdf',
        name: 'Another Map'
      }, 
      {
        id: '9999qqqq',
        name: 'test3'
      }]
    }
  }

  

  render() {
    window.myprops=this.props
    let mapsLinks = this.state.maps.map((map, i)=>{
      return (
        <li key={map.id}>
          <Link to={`/canvas/${map.id}`}>{map.name}</Link>
        </li>
        )
    })
    return (
      <div>
        Click on the following to link to different maps:
        {mapsLinks}
      </div>
    )
  }
}

export default withRouter(Home);