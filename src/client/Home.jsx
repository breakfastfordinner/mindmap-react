import React from 'react';
import { BrowserRouter, Route, Link, NavLink, withRouter } from 'react-router-dom';
import MapModel from './actions/maps';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

const styles = {
  navlink: {
    textDecoration: 'none',
    color: '#212121'
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createToggle: false,
      open: false,
    }
    this.createMap = this.createMap.bind(this);
    this.destroyMap = this.destroyMap.bind(this);
    this.toggleCreateMapForm = this.toggleCreateMapForm.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.props.signedIn? null : this.props.history.push('/login');
  }

  toggleCreateMapForm() {
    this.setState({
      createToggle: !this.state.createToggle
    });
  }

  handleOpen(id) {
    this.setState({open: true});
    this.id = id;
  };

  handleClose() {
    this.setState({open: false});
  };

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
          <MenuItem onClick={()=> {this.destroyMap(map.id)}} ><NavLink style={styles.navlink} to={`/canvas/${map.id}`}>Edit</NavLink></MenuItem>
          <MenuItem onClick={()=> {this.handleOpen(map.id)}} >Delete</MenuItem>
        </IconMenu>
      );

      return (
        <div>
          <ListItem key={map.id} rightIconButton={rightIconMenu} >
            <NavLink style={styles.navlink} to={`/canvas/${map.id}`}>{map.name}</NavLink>
          </ListItem>
          <Divider inset={true} />
        </div>
        )
    })


    return (
      <div className="home">

         <FloatingActionButton >
               <ContentAdd />
        </FloatingActionButton>

        <button className="createMap" onClick={this.toggleCreateMapForm}>Create a new map</button>
        { this.state.createToggle &&
          <form onSubmit={this.createMap}>
          <input className="mapNameField" name="mapName" type="text" placeholder="Name Your Map!" />
          <input className="submit" type="submit" value="Create!" />
          </form>}

          <Dialog
            title="Delete your map?"
            actions={[
              <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
              <FlatButton label="Delete" secondary={true} keyboardFocused={true} onClick={()=> {this.destroyMap(this.id)}} />,
            ]}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Your map will be gone forever!
          </Dialog>

          <List>
            <Subheader>Your maps</Subheader>
            {mapsLinks}
          </List>

        </div>
    )
  }
}

export default withRouter(Home);
