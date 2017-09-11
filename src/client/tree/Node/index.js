/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { select } from 'd3';

import './style.css';

export default class Node extends React.Component {

  constructor(props) {
    // console.log('the props in node:', props)
    super(props);
    const { parent } = props.nodeData;
    const originX = parent ? parent.x : 0;
    const originY = parent ? parent.y : 0;

    this.state = {
      transform: this.setTransformOrientation(originX, originY),
      initialStyle: {
        opacity: 0,
      },
      textFormToggle: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleTextClick = this.handleTextClick.bind(this);
    // window = this.setTransformOrientation
  }

  componentDidMount() {
    //console.log('rendering theme', this.props.theme)
    const { x, y } = this.props.nodeData;
    const transform = this.setTransformOrientation(x, y);

    this.applyTransform(transform);
  }

  componentWillUpdate(nextProps) {
    const transform = this.setTransformOrientation(nextProps.nodeData.x, nextProps.nodeData.y);
    this.applyTransform(transform);
  }

  setTransformOrientation(x, y) {
    return this.props.orientation === 'horizontal' ?
      `translate(${y},${x})` :
      `translate(${x},${y})`;
  }

  applyTransform(transform, opacity = 1, done = () => {}) {
    const { transitionDuration } = this.props;

    // Drag nodes
    // const drag = d3.behavior.drag()
    //     .on("drag", dragmove);

    // function dragmove(d) {
    //   var x = d3.event.x;
    //   var y = d3.event.y;
    //   d3.select(this.node).attr("transform", "translate(" + x + "," + y + ")");
    // }

    select(this.node)
    .transition()
    .duration(transitionDuration)
    .attr('transform', transform)
    .style('opacity', opacity)
    //.call(drag)
    .each('end', done);
  }

  handleClick() {
    this.props.onClick(this.props.nodeData.id);
  }
  handleRightClick() {
    this.props.onRightClick(this.props.nodeData.id);
  }
  handleTextClick() {
    this.props.toggleOnNodeNameModal(this.props.nodeData.id);
  }


  componentWillLeave(done) {
    const { parent } = this.props.nodeData;
    const originX = parent ? parent.x : 0;
    const originY = parent ? parent.y : 0;
    const transform = this.setTransformOrientation(originX, originY);

    this.applyTransform(transform, 0, done);
  }

  render() {
    const { nodeData, styles } = this.props;

    let nodeColor = '#0CCE6B'

    if (this.props.theme === 'default') {
      //default theme
      if (this.props.depth === 0){
        nodeColor = '#540D6E'
      } else if (this.props.depth === 1){
        nodeColor = '#0CCE6B'
      } else if (this.props.depth === 2){
        nodeColor = '#DCED31'
      } else if (this.props.depth === 3){
        nodeColor = '#EF2D56'
      } else {
        nodeColor =  '#ED7D3A'
      }
    } else if (this.props.theme === 'piedpiper') {
        //pied piper
        if (this.props.depth === 0){
          nodeColor = '#182F08'
        } else if (this.props.depth === 1){
          nodeColor = '#2E5016'
        } else if (this.props.depth === 2){
          nodeColor = '#5C9E2C'
        } else if (this.props.depth === 3){
          nodeColor = '#8FD260'
        } else {
          nodeColor =  '#B7FF80'
        }
    } else if (this.props.theme === 'lifeaquatic') {
        //life aquatic
        if (this.props.depth === 0){
          nodeColor = '#C4CFD0'
        } else if (this.props.depth === 1){
          nodeColor = '#F24D29'
        } else if (this.props.depth === 2){
          nodeColor = '#E5C4A1'
        } else if (this.props.depth === 3){
          nodeColor = '#1C366B'
        } else {
          nodeColor =  '#1DACE8'
        }
    } else if (this.props.theme === 'flame') {
        //flame
        if (this.props.depth === 0){
          nodeColor = '#421201'
        } else if (this.props.depth === 1){
          nodeColor = '#6B1808'
        } else if (this.props.depth === 2){
          nodeColor = '#B5210E'
        } else if (this.props.depth === 3){
          nodeColor = '#D33E08'
        } else {
          nodeColor =  '#F6AA1C'
        }
    }

    const nodeStyle = nodeData._children ? { ...styles.node } : { ...styles.leafNode };
    // console.log(nodeStyle, '====')

    return (

      <g
        id={nodeData.id}
        ref={(n) => { this.node = n; }}
        style={{fill: `${nodeColor}`}}
        className="nodeBase"
        transform={this.state.transform}
        // onClick={this.handleClick}
        onContextMenu={this.handleRightClick}
        onDrag={this.test}
      >


        <circle
          r={this.props.circleRadius}
          style={nodeStyle.circle}
          onDoubleClick={this.handleClick}
        >
        </circle>
         <text
          className="nodeNameBase"
          textAnchor={this.props.textAnchor}
          style={nodeStyle.name}
          x="10"
          y="-10"
          dy=".35em"
          onClick={this.handleTextClick}
        >
          {this.props.name}
        </text>

        <text
          className="nodeAttributesBase"
          y="0"
          textAnchor={this.props.textAnchor}
          style={nodeStyle.attributes}
        >
          {
            this.props.attributes &&
            Object.keys(this.props.attributes).map((labelKey) =>
              <tspan x="10" dy="1.2em" key={uuid.v4()}>
                {labelKey}: {this.props.attributes[labelKey]}
              </tspan>
            )
          }
        </text>
      </g>
    );
  }
}

Node.defaultProps = {
  textAnchor: 'start',
  attributes: undefined,
  styles: {
    node: {
      circle: {},
      name: {},
      attributes: {},
    },
    leafNode: {
      circle: {},
      name: {},
      attributes: {},
    },
  },
};

Node.propTypes = {
  nodeData: PropTypes.object.isRequired,
  orientation: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]).isRequired,
  transitionDuration: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  textAnchor: PropTypes.string,
  circleRadius: PropTypes.number.isRequired,
  styles: PropTypes.object,
};
