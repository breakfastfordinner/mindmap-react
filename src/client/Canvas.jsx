import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TestMap from './TestMap.jsx';
import MapModel from './actions/maps';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import NodeNameModal from './NodeNameModal.jsx'



const styles = {
  title: {
    padding: '20px 20px',
  },
  drawerButton: {
    padding: '0 20px',
    marginTop: '20px',
  },
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

class Canvas extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        map: { name: 'random', tree: {}},
        tree: [{name: 'startup', children: [ {name: '2nd', children: [] } ]}],
        mapName: 'random',
        editNameToggle: false,
        toggleNodeNameChange: false,
        selectedNodeId: '',
        open: false
      }

    this.updateMap = this.updateMap.bind(this);
    this.updateMapName = this.updateMapName.bind(this);
    this.toggleNameChange = this.toggleNameChange.bind(this);
    this.untoggleNameChange = this.untoggleNameChange.bind(this);
    this.toggleOnNodeNameModal = this.toggleOnNodeNameModal.bind(this);
    this.toggleOffNodeNameModal = this.toggleOffNodeNameModal.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }


  // componentWillReceiveProps() {
  //   this.updateMap();
  // }
  // shouldComponentUpdate(nextProp, nextState) {
  //   console.log('inside of should compupdate:', nextProp);
  //   console.log('inside of should update, nextSTATE:', nextState)
  //   console.log('will this rerender?', !nextState.toggleNodeNameChange)
  //   return !nextState.toggleNodeNameChange;
  // }


  componentDidMount() {
    this.updateMap();
  }

  toggleOnNodeNameModal(nodeId) {
    this.setState({
      toggleNodeNameChange: true,
      selectedNodeId: nodeId
    })
  }

  toggleOffNodeNameModal() {
    this.setState({
      toggleNodeNameChange: false
    })
  }

  toggleNameChange() {
    this.setState({
      editNameToggle: !this.state.editNameToggle
    })
  }


  untoggleNameChange(e) {
    e.preventDefault();
    this.updateMapName(e.target.mapNameUpdate.value);
    e.target.mapNameUpdate.value = '';
    this.setState({
      editNameToggle: false
    })
  }


  handleToggle() {
    this.setState({open: !this.state.open})
  }

  async updateMap() {
    let mapResponse = await MapModel.getMap(this.props.match.params.id);
    this.setState({
      map: mapResponse.map,
      mapName: mapResponse.map.name,
      tree: mapResponse.map.tree
    })
  }

  async updateMapName(mapName) {
    if (mapName === "") {
      console.log("nothing enter, dont fire request")
    } else {
      await MapModel.editMapName(this.props.match.params.id, mapName);

      this.updateMap();
      this.props.updateMaps();
    }
  }



  render() {
    return (
      <div>
        {//this.props.match.params.id
        }
        <div className='mapTitle'>

          <div>
            <IconButton onClick={this.handleToggle} ><ModeEdit /></IconButton>
            {!this.state.editNameToggle &&
            <span onClick={this.toggleNameChange}> {this.state.mapName}
            </span>
          }
          </div>
          {this.state.editNameToggle &&
            <form onSubmit={this.untoggleNameChange}>
              <TextField name="mapNameUpdate" placeholder={this.state.mapName} />
              <input type="submit" value="update" style={{ visibility: 'hidden' }}/>
            </form>
          }

        </div>

        <Drawer zDepth={1} open={this.state.open}>
          <MenuItem
            primaryText="Layout"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Default" insetChildren={true} checked={true}/>,
              <MenuItem primaryText="Cool Color Combo"  insetChildren={true}/>,
              <MenuItem primaryText="Sweet Color Scheme" insetChildren={true}/>,
              <MenuItem primaryText="XKCD" insetChildren={true}/>,
            ]}
          />

          <MenuItem
            primaryText="Orientation"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Horizontal" checked={true} insetChildren={true}/>,
              <MenuItem primaryText="Vertical" insetChildren={true}/>,
            ]}
          />
          <MenuItem
            primaryText="Node Shape"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Circle" insetChildren={true} checked={true}/>,
              <MenuItem primaryText="Triangle" insetChildren={true}/>,
              <MenuItem primaryText="Rectangle" insetChildren={true}/>,
              <MenuItem primaryText="Star" insetChildren={true}/>,
            ]}
          />

          <Divider />
          <MenuItem primaryText="More options" />
          <MenuItem primaryText="Even more options" />
          <Divider />
          <MenuItem primaryText="Share" />
        </Drawer>

        { this.state.toggleNodeNameChange &&
        <NodeNameModal
        nodeId={this.state.selectedNodeId}
        mapId={this.props.match.params.id}
        tree={this.state.tree}
        updateMap={this.updateMap}
        toggleOffNodeNameModal={this.toggleOffNodeNameModal} />
        }

        <TestMap
        tree={this.state.tree}
        updateMap={this.updateMap}
        mapId={this.props.match.params.id}
        toggleOnNodeNameModal={this.toggleOnNodeNameModal}
        toggleNodeNameChange={this.state.toggleNodeNameChange}/>

        </div>
      )
    }

}

export default withRouter(Canvas);
