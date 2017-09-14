import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TestMap from './TestMap.jsx';
import MapModel from './actions/maps';
import ToolDrawer from './ToolDrawer.jsx'
import NodeSlider from './Slider.jsx';

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
import ReactTooltip from 'react-tooltip';
import Slider from 'material-ui/Slider';

const styles = {
  title: {
    cursor: 'pointer !important'
  },
  drawerButton: {
    zIndex: 3,
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    height: '15px',
    width: 'auto',
  },
  slider: {
    bottom: 0,
    position: 'fixed',
    width: '100%'
  }
};



class View extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        map: { name: 'random', tree: {}},
        tree: [{name: 'startup', children: [ {name: '2nd', children: [] } ]}],
        mapName: '',
        open: false,
        orientation: 'horizontal',
        pathFunc: 'diagonal',
        separation: { siblings: .5, nonSiblings: 1 },
        firstSlider: 0.5,
        theme: 'default'
      }

    this.updateMap = this.updateMap.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.selectHorizontal = this.selectHorizontal.bind(this);
    this.selectVertical = this.selectVertical.bind(this);
    this.selectDiagonal = this.selectDiagonal.bind(this);
    this.selectStraight = this.selectStraight.bind(this);
    this.selectElbow = this.selectElbow.bind(this);
    this.handleFirstSlider = this.handleFirstSlider.bind(this);
    this.selectDefaultTheme = this.selectDefaultTheme.bind(this);
    this.selectPiedPiperTheme = this.selectPiedPiperTheme.bind(this);
    this.selectLifeAquaticTheme = this.selectLifeAquaticTheme.bind(this);
    this.selectFlameTheme = this.selectFlameTheme.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }


  componentDidMount() {
    this.updateMap();
  }

  handleDrawerToggle() {
    console.log('?????')
    this.setState({open: !this.state.open})
  }

  selectDefaultTheme() {
    this.setState({theme: 'default'});
    this.updateMap();
  }

  selectPiedPiperTheme() {
    this.setState({theme: 'piedpiper'});
    this.updateMap();
  }
  selectLifeAquaticTheme() {
    this.setState({theme: 'lifeaquatic'});
    this.updateMap();
  }
  selectFlameTheme() {
    this.setState({theme: 'flame'});
    this.updateMap();
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

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };

  handleFirstSlider(value){
    this.setState({
      firstSlider: value,
      separation: {
        siblings: value,
        nonSiblings: value * 2.5
      }
    })

  };


  async updateMap() {
    let mapResponse = await MapModel.getViewMap(this.props.match.params.id);
    this.setState({
      map: mapResponse.map,
      mapName: mapResponse.map.name,
      tree: mapResponse.map.tree
    })
  }

  render() {
    return (
      <div>
        <div className='mapTitle' style={styles.title}>
              <TextField
                name="mapNameUpdate"
                defaultValue={this.state.mapName}
                //hintText={this.state.mapName}
                placeholder={this.state.mapName}
                underlineShow={false}
                disabled={true}
                inputStyle={{ textAlign: 'center' }}
                //hintStyle={{ width: '600px', textAlign: 'center' }}
                style={{ width: '600px' }}
              />
        </div>

        <ReactTooltip place="right" />
        <FloatingActionButton
          style={styles.drawerButton}
          onClick={this.handleDrawerToggle}
          data-tip="Settings"
        >

          <Settings />
        </FloatingActionButton>

          <ToolDrawer
          open={this.state.open}
          theme={this.state.theme}
          orientation={this.state.orientation}
          pathFunc={this.state.pathFunc}
          selectHorizontal={this.selectHorizontal}
          selectVertical={this.selectVertical}
          selectDiagonal={this.selectDiagonal}
          selectElbow={this.selectElbow}
          selectStraight={this.selectStraight}
          selectDefaultTheme={this.selectDefaultTheme}
          selectPiedPiperTheme={this.selectPiedPiperTheme}
          selectLifeAquaticTheme={this.selectLifeAquaticTheme}
          selectFlameTheme={this.selectFlameTheme}
          handleFirstSlider={this.handleFirstSlider}
          handleRequestClose={this.handleRequestClose}
          view={true}
        />

        <TestMap
          view={true}
          mapId={this.props.match.params.id}
          orientation={this.state.orientation}
          pathFunc={this.state.pathFunc}
          updateMap={this.updateMap}
          theme={this.state.theme}
          separation={this.state.separation}
          firstSlider={this.state.firstSlider}
          tree={this.state.tree}
        />

          <div style={styles.slider} >
            <NodeSlider
              onSlide={this.handleFirstSlider}
            />

          </div>

        </div>

      )
    }

}

export default withRouter(View);
