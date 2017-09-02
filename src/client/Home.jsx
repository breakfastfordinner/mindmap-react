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
      selectedId: ''
    }
    this.createMap = this.createMap.bind(this);
    this.destroyMap = this.destroyMap.bind(this);
    this.toggleCreateMapForm = this.toggleCreateMapForm.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  componentWillMount() {
    this.props.signedIn? null : this.props.history.push('/login');
    console.log(this.props)
  }

  toggleCreateMapForm() {
    this.setState({
      createToggle: !this.state.createToggle
    });
  }

  async createMap(e) {
    // console.log('should handle create a map', this.props)
    e.preventDefault();

    // fire post to create a new Map
    await MapModel.createMap(e.target.mapName.value)

    this.props.updateMaps();
    e.target.mapName.value = 'null';


  }



  async destroyMap(mapId) {
    // console.log('should handle delete a map', mapId)

    // fire post to delete a Map
    await MapModel.destroyMap(mapId);
    this.props.updateMaps();
    this.setState({open: false});
  }

  handleOpen(mapId) {
    console.log('id', mapId)
    this.setState({open: true});
    this.setState({selectedId: mapId});

    console.log('props', this.state)
  };

  handleClose() {
    this.setState({open: false});
  };




  render() {
    let mapsLinks = this.props.maps.map((map, i) =>{

        const iconButtonElement = (
          <IconButton
            touch={true}
            tooltip="more"
            tooltipPosition="bottom-left"
          >
            <MoreVertIcon color={grey400} />
          </IconButton>
        )

        const rightIconMenu = (
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem>Share</MenuItem>
            <MenuItem onClick={()=> {this.destroyMap(map._id)}} ><NavLink style={styles.navlink} to={`/canvas/${map._id}`}>Edit</NavLink></MenuItem>
            <MenuItem onClick={()=> {console.log('inside menuitem', map._id); this.handleOpen(map._id)}} >Delete</MenuItem>
          </IconMenu>
        );

        return (
          <div>
            <ListItem key={map._id} rightIconButton={rightIconMenu} >
              <NavLink style={styles.navlink} to={`/canvas/${map._id}`}>{map.name}</NavLink>
            </ListItem>
            <Divider inset={true} />
          </div>
        );
    })

      return (
        <div>
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
                title="Delete this map?"
                actions={[
                  <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
                  <FlatButton label="Delete" secondary={true} keyboardFocused={true} onClick={()=> {this.destroyMap(this.state.selectedId)}} />,
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
        </div>
      )
  }
}

export default withRouter(Home);
