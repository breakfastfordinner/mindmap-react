import React from 'react';
import Tree from './tree/index.js';

class TestMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

      <div id="treeWrapper" style={{ width: '100%', height: '1000px'}}>

        <Tree data={ this.props.tree } updateMap={ this.updateMap } />

      </div>
    );
  }
}


export default TestMap;
