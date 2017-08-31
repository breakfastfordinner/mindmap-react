import React from 'react';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.signedIn? null : this.props.history.push('/login');
  }



  render() {
    window.myprops=this.props
    let mapsLinks = this.props.maps.map((map, i)=>{
      return (
        <li key={map.id}>
          <Link to={`/canvas/${map.id}`}>{map.name}</Link>
        </li>
        )
    })
    return (
      <div className="home">
        Click on the following to link to different maps:
        {mapsLinks}
      </div>
    )
  }
}

export default withRouter(Home);
