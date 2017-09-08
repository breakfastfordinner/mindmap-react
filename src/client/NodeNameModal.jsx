import React from 'react';
import clone from 'clone';
import MapModel from './actions/maps';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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

    const dialog = {
      width: '480px',
    };

    return (
      <div>
        <Dialog
          open={true}
          title="Edit node title"
          modal={false}
          onRequestClose={this.closeModal}
          contentStyle={dialog}
        >

        <form className='nodeNameForm' onSubmit={this.handleOnNodeNameSubmit}>
          <TextField className="nodeNameUpdate" name="nodeNameUpdate" placeholder="enter new name" />
          <FlatButton type = "submit" label="accept" primary={true}/>
          <FlatButton onClick={this.closeModal} secondary={true} >Cancel</FlatButton>
        </form>
        </Dialog>
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
