import React from 'react';
import clone from 'clone';
import MapModel from './actions/maps';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CopyToClipboard from 'react-copy-to-clipboard';

const styles = {
  copied: {
    height: '20px'
  }
}


class SharedLinkModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      copied: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }

  closeModal() {
    this.setState({
      copied: false
    })
    this.props.toggleOffSharedLinkModal();
  }

  onCopy() {
    this.setState({
      copied: true
    })
  }


  render() {

    return (
      <div>
        <Dialog
          open={true}
          title="Copy the following link!"
          modal={false}
          onRequestClose={this.closeModal}
          contentStyle={styles.copied}
        >
        {this.state.copied? <div style={styles.copied}>Link copied!</div> : <div style={styles.copied}></div>}
        <form className='SharedLink'>
          <TextField className="sharedLink" name="sharedLink" value={this.props.sharedLink} />
          <CopyToClipboard text={this.props.sharedLink} onCopy={this.onCopy}>
            <FlatButton label="Copy" primary={true}/>
          </CopyToClipboard>
          <FlatButton onClick={this.closeModal} secondary={true} >Done</FlatButton>
        </form>
        </Dialog>

      </div>
    )
  }


}


export default SharedLinkModal;
