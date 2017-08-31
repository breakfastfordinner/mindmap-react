import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TestMap from './TestMap.jsx';
import MapModel from './actions/maps';


class Canvas extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        map: {}
    }
    this.updateMap = this.updateMap.bind(this);
    this.updateMapName = this.updateMapName.bind(this);
  }

  componentDidMount() {

    /*ajax call that 
      input = map id = {this.props.match.params.id} + user token
      output = map object || callback that has map object
      set the state of map to that map object

      MapModel.getMap(this.props.match.params.id)
      setState of the map
    */

  }

  

  async updateMap() {
     // MapModel.getMap(this.props.match.params.id)
     //  setState of the map
  }

  async updateMapName() {
    /*
    MapModel.editMapName(this.props.match.params.id, mapName)
    */
    // this.updateMap();
  }


  render() {
    return (
      <div>
        The map being rendered is:
        {this.props.match.params.id}

        <TestMap map={this.state.map}></TestMap>
      </div>
      )
  }

}

export default withRouter(Canvas);
