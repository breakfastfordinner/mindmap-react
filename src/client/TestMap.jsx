import React from 'react';
import Tree from './tree/index.js';

class TestMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.tree,
    }
  }



  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.tree
    })
  }

  render() {
    return (
      <div id="treeWrapper" style={{ width: '100%', height: '1000px'}}>
        <Tree
        view={this.props.view}
        data={ this.state.data }
        updateMap={ this.props.updateMap }
        theme={this.props.theme}
        mapId={this.props.mapId}
        orientation={this.props.orientation}
        separation={this.props.separation}
        firstSlider={this.props.firstSlider}
        pathFunc={this.props.pathFunc}
        toggleOnNodeNameModal={this.props.toggleOnNodeNameModal}
        toggleNodeNameChange={this.props.toggleNodeNameChange}/>
      </div>
    );
  }
}


export default TestMap;
