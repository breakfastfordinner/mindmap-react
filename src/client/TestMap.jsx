import React from 'react';
import Tree from './tree/index.js';

class TestMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.tree
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('in testMap', nextProps)
    this.setState({
      data: nextProps.tree
    })
  }

  render() {
    // console.log(this.props, 'check how many times this render')
    return (

      <div id="treeWrapper" style={{ width: '100%', height: '1000px'}}>
        <Tree
        data={ this.state.data }
        updateMap={ this.props.updateMap }
        mapId={this.props.mapId}
        toggleOnNodeNameModal={this.props.toggleOnNodeNameModal}
        toggleNodeNameChange={this.props.toggleNodeNameChange}/>
      </div>
    );
  }
}


export default TestMap;
