import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TestMap from './TestMap.jsx';


class Canvas extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        map: {}
    }
  }

  componentDidMount() {

    /*ajax call that 
      input = map id = {this.props.match.params.id} + user token
      output = map object || callback that has map object
      set the state of map to that map object
    */
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
