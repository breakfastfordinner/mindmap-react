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


// [
//           {
//             name: 'Parent 1st tier',
//             attributes: {
//             },
//             children: [
//               {
//                 name: 'Child 2nd tier',
//                 attributes: {
//                   keyA: 'val A',
//                   keyB: 'val B',
//                   keyC: 'val C',
//                 },
//                 children: [
//                   {
//                     name: '3rd tier',
//                   },
//                   {
//                     name: '3rd tier 2',
//                   },
//                 ],
//               },
//               {
//                 name: 'Child2 2nd tier',
//                 children: [
//                   {
//                     name: 'child2 3rd tier',
//                     children: [
//                       {
//                         name: 'child2 4th tier'
//                       }
//                     ],
//                   },
//                   {
//                     name: 'child2 3rd tier 2'
//                   }
//                 ],
//               },
//             ],
//           },
//         ]

class Canvas extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        map: { name: 'random', tree: {}},
        tree: [{name: 'startup', children: [ {name: '2nd', children: [] } ]}],
        mapName: 'random',
        editNameToggle: false,
        toggleNodeNameChange: false,
        open: false
    }
    this.updateMap = this.updateMap.bind(this);
    this.updateMapName = this.updateMapName.bind(this);
    this.toggleNameChange = this.toggleNameChange.bind(this);
    this.untoggleNameChange = this.untoggleNameChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }


  componentWillReceiveProps() {
    this.updateMap();
  }

  componentDidMount() {

    this.updateMap();
    /*ajax call that
      input = map id = {this.props.match.params.id} + user token
      output = map object || callback that has map object
      set the state of map to that map object
      MapModel.getMap(this.props.match.params.id)
      setState of the map
    */

  }

   toggleNodeNameChange() {

   }

   toggleNameChange() {
     this.setState({
       editNameToggle: !this.state.editNameToggle
     })
   }

  untoggleNameChange(e) {
    e.preventDefault();
    this.updateMapName(e.target.mapNameUpdate.value);
    // console.log('no')
    e.target.mapNameUpdate.value = '';
    this.setState({
      editNameToggle: false
    })
  }


  handleToggle() {
    this.setState({open: !this.state.open})
  }

  async updateMap() {
    // console.log('if you see this, means entire map view should be rerendered')
    let mapResponse = await MapModel.getMap(this.props.match.params.id);
    //do something to prevent a problem where there's no tree retrieved from database
    //if all noedes are removed?
    this.setState({
      map: mapResponse.map,
      mapName: mapResponse.map.name,
      tree: mapResponse.map.tree
    })

     //  setState of the map, mapname, tree
     // console.log(this.state.tree, 'fkdopsakf======check on this')
  }



  async updateMapName(mapName) {
    if (mapName === "") {
      console.log("nothing enter, dont fire request")
    } else {


      await MapModel.editMapName(this.props.match.params.id, mapName);

      // console.log('update name to: ', mapName)
      // this.setState({
      //   mapName: mapName
      // })

      this.updateMap();
      this.props.updateMaps();
    }
  }



  render() {
    return (
      <div >
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


         <TestMap tree={this.state.tree} updateMap={this.updateMap} mapId={this.props.match.params.id}></TestMap>



      </div>
      )
  }

}

export default withRouter(Canvas);
