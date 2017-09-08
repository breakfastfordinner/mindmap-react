import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TestMap from './TestMap.jsx';
import MapModel from './actions/maps';
import NodeNameModal from './NodeNameModal.jsx'
import ToolDrawer from './ToolDrawer.jsx'

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Settings from 'material-ui/svg-icons/action/settings';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';



const styles = {
  title: {
    padding: '20px 20px',
  },
  drawerButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
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
        open: false,
        orientation: 'horizontal',
        pathFunc: 'diagonal'
      }

    this.updateMap = this.updateMap.bind(this);
    this.updateMapName = this.updateMapName.bind(this);
    this.toggleNameChange = this.toggleNameChange.bind(this);
    this.untoggleNameChange = this.untoggleNameChange.bind(this);
    this.toggleOnNodeNameModal = this.toggleOnNodeNameModal.bind(this);
    this.toggleOffNodeNameModal = this.toggleOffNodeNameModal.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.selectHorizontal = this.selectHorizontal.bind(this);
    this.selectVertical = this.selectVertical.bind(this);
    this.selectDiagonal = this.selectDiagonal.bind(this);
    this.selectStraight = this.selectStraight.bind(this);
    this.selectElbow = this.selectElbow.bind(this);
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

    //prevent chrome's default menu on right click
    document.addEventListener('contextmenu', event => event.preventDefault());
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


  handleDrawerToggle() {
    this.setState({open: !this.state.open})
  }

  selectHorizontal() {
    this.setState({orientation: 'horizontal'});
    this.updateMap();
  }

  selectVertical() {
    this.setState({orientation: 'vertical'});
    this.updateMap();
  }

  selectDiagonal() {
    this.setState({pathFunc: 'diagonal'});
    this.updateMap();
  }

  selectElbow() {
    this.setState({pathFunc: 'elbow'});
    this.updateMap();
  }

  selectStraight() {
    this.setState({pathFunc: 'straight'});
    this.updateMap();
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

        <FloatingActionButton
          style={styles.drawerButton}
          onClick={this.handleDrawerToggle}>
          <Settings />
        </FloatingActionButton>

        <ToolDrawer
          open={this.state.open}
          orientation={this.state.orientation}
          pathFunc={this.state.pathFunc}
          selectHorizontal={this.selectHorizontal}
          selectVertical={this.selectVertical}
          selectDiagonal={this.selectDiagonal}
          selectElbow={this.selectElbow}
          selectStraight={this.selectStraight}
        />

        { this.state.toggleNodeNameChange &&
          <NodeNameModal
            nodeId={this.state.selectedNodeId}
            mapId={this.props.match.params.id}
            tree={this.state.tree}
            updateMap={this.updateMap}
            toggleOffNodeNameModal={this.toggleOffNodeNameModal}
          />
        }

        <TestMap
          mapId={this.props.match.params.id}
          orientation={this.state.orientation}
          pathFunc={this.state.pathFunc}
          updateMap={this.updateMap}
          toggleOnNodeNameModal={this.toggleOnNodeNameModal}
          toggleNodeNameChange={this.state.toggleNodeNameChange}
          tree={this.state.tree}
        />

        </div>
      )
    }

}

export default withRouter(Canvas);
