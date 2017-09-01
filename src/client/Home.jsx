import React from 'react';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import MapModel from './actions/maps';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createToggle: false
    }
    this.createMap = this.createMap.bind(this);
    this.destroyMap = this.destroyMap.bind(this);
    this.toggleCreateMapForm = this.toggleCreateMapForm.bind(this);
  }

  componentWillMount() {
    this.props.signedIn? null : this.props.history.push('/login');
  }

  toggleCreateMapForm() {
    this.setState({
      createToggle: !this.state.createToggle
    });
  }

  async createMap(e) {
    console.log('should handle create a map')
    e.preventDefault();
    
    // fire post to create a new Map
    await MapModel.createMap(e.target.mapName.value)
    e.target.mapName.value = '';

    this.props.updateMaps();
    
    
  }

  async destroyMap(mapId) {
    console.log('should handle delete a map', mapId)
    
    // fire post to delete a Map
    await MapModel.destroyMap(mapId);

    this.props.updateMaps();
    
  }


  render() {
    let mapsLinks = this.props.maps.map((map, i)=>{
      return (
        <li key={map.id}>
          <Link to={`/canvas/${map.id}`}>{map.name}</Link>
          <button className="destroyMap" onClick={()=>{this.destroyMap(map.id)}}>Delete This Map</button>

        </li>
        )
    })
    return (
      <div className="home">
      <button className="createMap" onClick={this.toggleCreateMapForm}>Create a new map</button>
      { this.state.createToggle && 
        <form onSubmit={this.createMap}> 
        <input className="mapNameField" name="mapName" type="text" placeholder="Name Your Map!" />
        <input className="submit" type="submit" value="Create!" /> 
        </form>}
        Click on the following to link to different maps:
        {mapsLinks}
      </div>
    )
  }
}

export default withRouter(Home);
