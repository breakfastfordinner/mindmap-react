import React from 'react';
import { BrowserRouter, Route, Link, NavLink, withRouter } from 'react-router-dom';
import MapModel from './actions/maps';

import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
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
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const styles = {
  navlink: {
    textDecoration: 'none',
    color: '#212121'
  },
  newmap: {
    paddingLeft: '20px',
    marginRight: '30px'
  }

};

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createToggle: false,
      open: false,
      selectedId: '',
      value: ''
    };
    this.createMap = this.createMap.bind(this);
    this.destroyMap = this.destroyMap.bind(this);
    this.toggleCreateMapForm = this.toggleCreateMapForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  componentWillMount() {
    cookies.get('user')? null : this.props.history.push('/login');
  }

  toggleCreateMapForm() {
    this.setState({
      createToggle: !this.state.createToggle
    });
  }

  async createMap() {
    await MapModel.createMap(this.state.value)

    this.props.updateMaps();

    this.setState({ value: '' })
  };



  async destroyMap(mapId) {
    await MapModel.destroyMap(mapId);
    this.props.updateMaps();
    this.setState({open: false});
  };

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleOpen(mapId) {
    this.setState({open: true});
    this.setState({selectedId: mapId});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {

    let mapsLinks = this.props.maps.map((map, i) => {

        const iconButtonElement = (
          <IconButton
            touch={true}
            tooltip="more"
            tooltipPosition="bottom-right"
          >
            <MoreVertIcon color={grey400} />
          </IconButton>

        )

        const rightIconMenu = (
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem>Share</MenuItem>
            <MenuItem ><NavLink style={styles.navlink} to={`/canvas/${map._id}`}>Edit</NavLink></MenuItem>
            <MenuItem onClick={()=> {this.handleOpen(map._id)}} >Delete</MenuItem>
          </IconMenu>
        );

        return (
          <div key={i}>
            <Divider />
            <ListItem rightIconButton={rightIconMenu} >
              <NavLink style={styles.navlink} to={`/canvas/${map._id}`}>{map.name}</NavLink>
            </ListItem>
          </div>
        );
    })

    return (
      <div>
        <div className="home">

          <FlatButton label="New Map" primary={true} onClick={this.toggleCreateMapForm} />
          <br />
          { this.state.createToggle &&
            <div>
              <TextField
                style={styles.newmap}
                hintText='Name your map...'
                value={ this.state.value }
                onChange={ this.handleChange } />
              <FloatingActionButton onClick={this.createMap} mini={true}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          }

          <Dialog
            title="Delete this map?"
            actions={[
              <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
              <FlatButton label="Delete" secondary={true} keyboardFocused={true} onClick={()=> {this.destroyMap(this.state.selectedId)}} />,
            ]}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}>
            Your map will be gone forever!
          </Dialog>
          <Card>
            <List>
              <Subheader>Your maps</Subheader>
              <br/>
              {mapsLinks}
            </List>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);
