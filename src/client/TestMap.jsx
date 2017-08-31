import React from 'react';
import Tree from './tree/index.js';

class TestMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

      <div id="treeWrapper" style={{ width: '1000px', height: '1000px'}}>

        <Tree data={ this.props.tree } />

      </div>
    );
  }
}


export default TestMap;
