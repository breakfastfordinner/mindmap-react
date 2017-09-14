import React from 'react';
import clone from 'clone';
import MapModel from './actions/maps';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class SharedLinkModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.toggleOffSharedLinkModal();
  }



  render() {

    const dialog = {
      width: '480px',
    };

    return (
      <div>
        <Dialog
          open={true}
          title="Copy the following link!"
          modal={false}
          onRequestClose={this.closeModal}
          contentStyle={dialog}
        >

        <form className='SharedLink'>
          <TextField className="sharedLink" name="sharedLink" value={this.props.sharedLink} />
          <FlatButton label="Copy" primary={true}/>
          <FlatButton onClick={this.closeModal} secondary={true} >Done</FlatButton>
        </form>
        </Dialog>

      </div>
    )
  }

   
}


export default SharedLinkModal;
