/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { layout, select, behavior, event } from 'd3';
import clone from 'clone';
import deepEqual from 'deep-equal';
import uuid from 'uuid';
import ReactTooltip from 'react-tooltip';
import Snackbar from 'material-ui/Snackbar';



import Node from '../Node';
import Link from '../Link';
import './style.css';

import MapModel from '../../actions/maps';

const TreeObject = function(name, id){
  this.name = name;
  this.id = id;
  this.children = [];
};

export default class Tree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialRender: true,
      data: this.assignInternalProperties(clone(props.data)),
      message: 'Node deleted',
      open: false,
      depth: 0

    };
    this.findNodesById = this.findNodesById.bind(this);
    this.collapseNode = this.collapseNode.bind(this);
    this.handleOnClickCb = this.handleOnClickCb.bind(this);
    this.addNode = this.addNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.resetSendData = this.resetSendData.bind(this);
    this.createLocalSendData = this.createLocalSendData.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.editMapHelper = this.editMapHelper.bind(this);
  }


  componentDidMount() {
    //console.log('tree state: ', this.state);

    this.bindZoomListener(this.props);
    // TODO find better way of setting initialDepth, re-render here is suboptimal
    this.setState({ initialRender: false }); // eslint-disable-line
    // this.editMapHelper();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.toggleNodeNameChange;
  }

  componentWillReceiveProps(nextProps) {
    // if (!deepEqual(this.props.data, nextProps.data)) {
    this.setState({
      data: this.assignInternalProperties(clone(nextProps.data)),
    }, ()=> {this.resetSendData()});

    // If zoom-specific props change -> rebind listener with new values
    if (!deepEqual(this.props.translate, nextProps.translate)
    || !deepEqual(this.props.scaleExtent, nextProps.scaleExtent)) {
      // console.log('ran this one?')
      this.bindZoomListener(nextProps);
    }
  }

  resetSendData() {
    return this.createLocalSendData(clone(this.state.data[0]))
  }

  /**
   * setInitialTreeDepth - Description
   *
   * @param {array} nodeSet Array of nodes generated by `generateTree`
   * @param {number} initialDepth Maximum initial depth the tree should render
   *
   * @return {void}
   */
  setInitialTreeDepth(nodeSet, initialDepth) {
    nodeSet.forEach((n) => {
      n._collapsed = n.depth >= initialDepth;
      this.setState({ value: '' })
    });
  }


  /**
   * bindZoomListener - If `props.zoomable`, binds a listener for
   * "zoom" events to the SVG and sets scaleExtent to min/max
   * specified in `props.scaleExtent`.
   *
   * @return {void}
   */
  bindZoomListener(props) {
    const { zoomable, scaleExtent, translate } = props;
    const svg = select('.rd3t-svg');
    const g = select('.rd3t-g');

    if (zoomable) {
      svg.call(behavior.zoom()
        .scaleExtent([scaleExtent.min, scaleExtent.max])
        .on('zoom', () => {
          g.attr('transform',
            `translate(${event.translate}) scale(${event.scale})`
          );
        })
        // Offset so that first pan and zoom does not jump back to [0,0] coords
        .translate([translate.x, translate.y])
      );
    }
  }


  /**
   * assignInternalProperties - Assigns internal properties to each node in the
   * `data` set that are required for tree manipulation and returns
   * a new `data` array.
   *
   * @param {array} data Hierarchical tree data
   *
   * @return {array} `data` array with internal properties added
   */
  assignInternalProperties(data) {
    return data.map((node) => {
      // console.log('why do they remake id', node,'node.id:', node.id, '??', node.name, '..', node.depth)
      if (!node.depth){
        node.depth = node.depth;
      }

      if(!node.id) {
        // console.log('here?')
        node.id = uuid.v4();
      }

      node._collapsed = false;
      // if there are children, recursively assign properties to them too
      if (node.children && node.children.length > 0) {
        node.children = this.assignInternalProperties(node.children);
        node._children = node.children;
      }

      //this.setState({ depth: node.depth })
      return node;
    });
  }


  /**
   * findNodesById - Description
   *
   * @param {string} nodeId The `node.id` being searched for
   * @param {array} nodeSet Array of `node` objects
   * @param {array} hits Accumulator for matches, passed between recursive calls
   *
   * @return {array} Set of nodes matching `nodeId`
   */
   // TODO Refactor this into a more readable/reasonable recursive depth-first walk.
  findNodesById(nodeId, nodeSet, hits) {

    if (hits.length > 0) {
      return hits;
    }

    hits = hits.concat(nodeSet.filter((node) => node.id === nodeId));

    nodeSet.forEach((node) => {
      //this.setState({ depth: node.depth })
      if (node._children && node._children.length > 0) {
        hits = this.findNodesById(nodeId, node._children, hits);
        return hits;
      }
      return hits;
    });

    return hits;
  }


  /**
   * collapseNode - Recursively sets the `_collapsed` property of
   * the passed `node` object and its children to `true`.
   *
   * @param {object} node Node object with custom properties
   *
   * @return {void}
   */
  collapseNode(node) {
    node._collapsed = true;
    if (node._children && node._children.length > 0) {
      node._children.forEach((child) => {
        this.collapseNode(child);
      });
    }
  }


  /**
   * expandNode - Sets the `_collapsed` property of
   * the passed `node` object to `false`.
   *
   * @param {type} node Node object with custom properties
   *
   * @return {void}
   */
  expandNode(node) {
    node._collapsed = false;
  }


  /**
   * handleNodeToggle - Finds the node matching `nodeId` and
   * expands/collapses it, depending on the current state of
   * its `_collapsed` property.
   * `setState` callback receives targetNode and handles
   * `props.onClick` if defined.
   *
   * @param {string} nodeId A node object's `id` field.
   *
   * @return {void}
   */
  handleOnClick(nodeId) {
    // this.handleOnClickCb();
    if (this.props.view) { return; }
    const data = clone(this.state.data);
    const matches = this.findNodesById(nodeId, data, []);
    const targetNode = matches[0];

    this.addNode(targetNode, data);


    // if (this.props.collapsible) {
    //   targetNode._collapsed
    //     ? this.expandNode(targetNode)
    //     : this.collapseNode(targetNode);
    //   this.setState({ data }, () => this.handleOnClickCb(targetNode));
    // } else {
    //   this.handleOnClickCb(targetNode);
    // }
  }

  async editMapHelper() {
    await MapModel.editMap(this.props.mapId, this.resetSendData());
    this.props.updateMap();
  }


  handleRightClick(nodeId) {
    if (this.props.view) { return; }
    const data = clone(this.state.data);

    this.setState({
        data: this.assignInternalProperties(this.removeNode(nodeId, data[0]))
      }, async ()=>{
        await MapModel.editMap(this.props.mapId, this.resetSendData());
        this.props.updateMap();
      })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };


  createLocalSendData(data) {

    let newData = new TreeObject(data.name, data.id);
    let inner = function(data, newData) {
      if (data.children === undefined) {
        return;
      }
      for (let i = 0; i < data.children.length; i++) {
        if (data.children[i].id) {
          newData.children.push(new TreeObject(data.children[i].name, data.children[i].id));
        } else {
          newData.children.push(new TreeObject(data.children[i].name));
        }
        inner(data.children[i], newData.children[i]);
      }
    }
    inner(data, newData);

    return [newData];
  }

  addNode(targetNode, data) {
      this.setState({ depth: targetNode.depth })
    if (targetNode.children) {
      targetNode.children.push({name: 'new node', children: []});
      this.setState({
        data: this.assignInternalProperties(clone(data))
      }, this.editMapHelper)
    } else {
      targetNode.children = [{name: 'new node', children:[]}];
      this.setState({
        data: this.assignInternalProperties(clone(data))
      }, this.editMapHelper)
    }
  }

  removeNode(nodeId, data) {
    if (data.id === nodeId) {
      this.setState({
        open: true,
        message: 'Cannot remove root node'
      });
      return [data];
    }
    if (data.children) {
      for (let i = 0; i < data.children.length; i++ ) {
        if (data.children[i].id === nodeId) {
          data.children.splice(i, 1);
          return [data]
        }
        //console.log(data.children[i].name)
        this.removeNode(nodeId, data.children[i])
        this.setState({
          open: true,
          message: 'Node removed'
        });
      }
    }
    return [data];
  }


  /**
   * handleOnClickCb - Handles the user-defined `onClick` function
   *
   * @param {object} targetNode Description
   *
   * @return {void}
   */
  handleOnClickCb(targetNode) {
    console.log('handleOnClickCb', targetNode)
    const { onClick } = this.props;
    if (onClick && typeof onClick === 'function') {
      onClick(clone(targetNode));
    }
  }


  /**
   * generateTree - Generates tree elements (`nodes` and `links`) by
   * grabbing the rootNode from `this.state.data[0]`.
   * Restricts tree depth to `props.initialDepth` if defined and if this is
   * the initial render of the tree.
   *
   * @return {object} Object containing `nodes` and `links`.
   */
  generateTree() {
    const {
      initialDepth,
      depthFactor,
      separation,
      nodeSize,
      orientation,
    } = this.props;


    const tree = layout.tree()
      .nodeSize(orientation === 'horizontal' ?
        [nodeSize.y, nodeSize.x] :
        [nodeSize.x, nodeSize.y]
      )
      .separation((a, b) => deepEqual(a.parent, b.parent) ?
        separation.siblings :
        separation.nonSiblings
      )
      .children((d) => d._collapsed ? null : d._children);

    const rootNode = this.state.data[0];
    const nodes = tree.nodes(rootNode);
    const links = tree.links(nodes);

    // set `initialDepth` on first render if specified
    if (initialDepth !== undefined && this.state.initialRender) {
      this.setInitialTreeDepth(nodes, initialDepth);
    }

    if (depthFactor) {
      nodes.forEach((node) => { node.y = node.depth * depthFactor; });
    }

    return { nodes, links };

  }

  render() {
    const { nodes, links } = this.generateTree();
    const {
      orientation,
      translate,
      pathFunc,
      transitionDuration,
      zoomable,
      circleRadius,
      styles,
    } = this.props;


    return (
      <div className={`rd3t-tree-container ${zoomable ? 'rd3t-grabbable' : undefined}`}>
        <ReactTooltip place="top" id='node'>
          <p>Double Click to Add</p>
          <p>Right Click to Delete</p>
        </ReactTooltip>

        <svg className="rd3t-svg" width="100%" height="100%">
          <g
            className="rd3t-g"
            transform={`translate(${translate.x},${translate.y})`}
            data-tip data-for='node'
          >
          {links.map((linkData) =>
            <Link
              key={uuid.v4()}
              orientation={orientation}
              pathFunc={pathFunc}
              linkData={linkData}
              transitionDuration={transitionDuration}
              styles={styles.links}
            />
          )}
          {nodes.map((nodeData) => {

            return (

              <Node
                key={nodeData.id}
                orientation={orientation}
                transitionDuration={transitionDuration}
                textAnchor="start"
                nodeData={nodeData}
                name={nodeData.name}
                depth={this.state.depth}
                attributes={nodeData.attributes}
                circleRadius={circleRadius}
                styles={styles.nodes}
                theme={this.props.theme}
                onClick={this.handleOnClick}
                onRightClick={this.handleRightClick}
                onTextClick={this.handleTextClick}
                toggleOnNodeNameModal={this.props.toggleOnNodeNameModal}
              >
              </Node>

            )
          })}
          </g>
        </svg>

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={1500}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
          action={'okay'}
        />

      </div>
    );
  }
}

Tree.defaultProps = {
  onClick: undefined,
  //orientation: 'horizontal',
  translate: { x: 350, y: 375 },
  //pathFunc: 'straight',
  // translate: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  transitionDuration: 500,
  depthFactor: undefined,
  collapsible: true,
  initialDepth: 150,
  zoomable: true,
  scaleExtent: { min: 0.1, max: 1 },
  nodeSize: { x: 150, y: 150 },
  separation: { siblings: .5, nonSiblings: 1 },
  circleRadius: 7,
  styles: {},
};

Tree.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  orientation: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]),
  translate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  pathFunc: PropTypes.oneOf([
    'diagonal',
    'elbow',
    'straight',
  ]),
  transitionDuration: PropTypes.number,
  depthFactor: PropTypes.number,
  collapsible: PropTypes.bool,
  initialDepth: PropTypes.number,
  zoomable: PropTypes.bool,
  scaleExtent: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  nodeSize: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  separation: PropTypes.shape({
    siblings: PropTypes.number,
    nonSiblings: PropTypes.number,
  }),
  circleRadius: PropTypes.number,
  styles: PropTypes.shape({
    nodes: PropTypes.object,
    links: PropTypes.object,
  }),
};
