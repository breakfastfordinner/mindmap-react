import React from 'react';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import MapModel from './actions/maps';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


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
  }s

  async createMap(e) {
    console.log('should handle create a map')
    e.preventDefault();
    /*
    fire post to create a new Map
    await MapModel.createMap(e.target.mapName.value)
    e.target.mapName.value = '';

    this.props.updateMaps();

    */
  }

  async destroyMap(mapId) {
    console.log('should handle delete a map', mapId)
    /*
    fire post to delete a Map
    await MapModel.deleteMap(mapId);

    this.props.updateMaps();
    */
  }



  render() {

    let mapsLinks = this.props.maps.map((map, i)=>{

      const iconButtonElement = (
        <IconButton
          touch={true}
          tooltip="more"
          tooltipPosition="bottom-left"
        >
          <MoreVertIcon color={grey400} />
        </IconButton>
      );

      const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem>Share</MenuItem>
          <MenuItem onClick={()=> {this.destroyMap(map.id)}} >Edit</MenuItem>
          <MenuItem onClick={()=> {this.destroyMap(map.id)}} >Delete</MenuItem>
        </IconMenu>
      );

      return (
        <div>
          <ListItem key={map.id} rightIconButton={rightIconMenu} >
            <Link to={`/canvas/${map.id}`}>{map.name}</Link>
          </ListItem>
          <Divider inset={true} />
        </div>
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
        <List>
          <Subheader>Your maps</Subheader>
          {mapsLinks}
        </List>

      </div>
    )
  }
}

export default withRouter(Home);
