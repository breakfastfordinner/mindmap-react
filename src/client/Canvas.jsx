import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TestMap from './TestMap.jsx';
import MapModel from './actions/maps';


class Canvas extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        map: { name: 'random', tree: {}},
        tree: [
          {
            name: 'Parent 1st tier',
            attributes: {
            },
            children: [
              {
                name: 'Child 2nd tier',
                attributes: {
                  keyA: 'val A',
                  keyB: 'val B',
                  keyC: 'val C',
                },
                children: [
                  {
                    name: '3rd tier',
                  },
                  {
                    name: '3rd tier 2',
                  },
                ],
              },
              {
                name: 'Child2 2nd tier',
                children: [
                  {
                    name: 'child2 3rd tier',
                    children: [
                      {
                        name: 'child2 4th tier'
                      }
                    ],
                  },
                  {
                    name: 'child2 3rd tier 2'
                  }
                ],
              },
            ],
          }, 
        ],
        mapName: 'random',
        editNameToggle: false,


    }
    this.updateMap = this.updateMap.bind(this);
    this.updateMapName = this.updateMapName.bind(this);
    this.toggleNameChange = this.toggleNameChange.bind(this);
    this.untoggleNameChange = this.untoggleNameChange.bind(this);
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
  

  async updateMap() {
    console.log('if you see this, means entire map view should be rerendered')
    let mapResponse = await MapModel.getMap(this.props.match.params.id);
    // console.log(mapResponse)
    this.setState({
      map: mapResponse.map,
      mapName: mapResponse.map.name
    })
     //  setState of the map, mapname, tree
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

  // addNode() {

  // }

  // deleteNode() {

  // }

  // editNode() {

  // }


  render() {
    return (
      <div>
        The map being rendered is:
        {this.props.match.params.id}
        {!this.state.editNameToggle && <div onClick={this.toggleNameChange}> {this.state.mapName} </div>}
        {this.state.editNameToggle && 
          <form onSubmit={this.untoggleNameChange}>
              <input className="mapNameUpdate" type="text" name="mapNameUpdate" placeholder={this.state.mapName} />
              <input type="submit" value="update" style={{ visibility: 'hidden' }}/>
          </form>
        }
        <TestMap tree={this.state.tree} updateMap={this.updateMap}></TestMap>
      </div>
      )
  }

}

export default withRouter(Canvas);
