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
            name: 'OMG this is rendering',
            attributes: {
              // keyA: 'val A',
              // keyB: 'val B',
              // keyC: 'val C',
            },
            children: [
              {
                name: 'Flavortown USA',
                attributes: {
                  keyA: 'val A',
                  keyB: 'val B',
                  keyC: 'val C',
                },
                children: [
                  {
                    name: 'yesssss',
                  },
                  {
                    name: 'success',
                  },
                ],
              },
              {
                name: 'imdabes',
                children: [
                  {
                    name: 'son of imdabes',
                    children: [
                      {
                        name: 'more childs'
                      }
                    ],
                  },
                  {
                    name: 'another child'
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
    this.addNode = this.addNode.bind(this);
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
     // MapModel.getMap(this.props.match.params.id)
     //  setState of the map, mapname, tree
  }

  async updateMapName(mapName) {
    if (mapName === "") {
      console.log("nothing enter, dont fire request")
    } else {
      
      /*
      await MapModel.editMapName(this.props.match.params.id, mapName)
      */
      console.log('update name to: ', mapName)
      this.setState({
        mapName: mapName
      })
      this.updateMap();
    }
  }

  addNode() {
    
  }


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
        <TestMap tree={this.state.tree}></TestMap>
      </div>
      )
  }

}

export default withRouter(Canvas);
