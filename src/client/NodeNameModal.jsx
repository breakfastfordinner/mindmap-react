import React from 'react';
import clone from 'clone';
import MapModel from './actions/maps';
import TextField from 'material-ui/TextField';


class NodeNameModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedNodeName: ''
    }
    this.closeModal = this.closeModal.bind(this);
    this.handleOnNodeNameSubmit = this.handleOnNodeNameSubmit.bind(this);
    this.editNode = this.editNode.bind(this);
  }

  closeModal() {
    this.props.toggleOffNodeNameModal();
  }

  async handleOnNodeNameSubmit(e) {
    e.preventDefault();
    // this.props.getNewName(e.target.nodeNameUpdate.value);
    let newData = clone(this.props.tree);
    // console.log('spectating newData:', newData);
    // console.log('compare to props: ', this.props.tree)
    await MapModel.editMap(this.props.mapId, this.editNode(this.props.nodeId, newData[0], e.target.nodeNameUpdate.value));
    this.props.updateMap();
    this.closeModal();
  }

  editNode(nodeId, tree, text) {
    if (tree.id === nodeId) {
      tree.name = text;
      return [tree];
    }
    for (let child of tree.children) {
      this.editNode(nodeId, child, text)
    }
    return [tree];
  }

  render() {
    // if (this.props)
    //   return null

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    return (
      <div>
        <div style={modalStyle}>
        Update your node:
        <form className='nodeNameForm' onSubmit={this.handleOnNodeNameSubmit}>
          <TextField className="nodeNameUpdate" name="nodeNameUpdate" placeholder="enter new name" />
          <input type = "submit" value="accept"/>
        </form>
        <button onClick={this.closeModal}>Nevermind Don't want to change anymore</button>
        </div>
        <div style={backdropStyle} />
      </div>
    )
  }

  // close(e) {
  //   e.preventDefault()

  //   if (this.props.onClose) {
  //     this.props.onClose()
  //   }
  // }
}

export default NodeNameModal;
