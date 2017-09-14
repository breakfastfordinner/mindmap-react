import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import NodeSlider from './Slider.jsx';
import SharedLinkModal from './SharedLinkModal.jsx';

class ToolDrawer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toggleSharedLinkModal: false
    }
    this.toggleOffSharedLinkModal = this.toggleOffSharedLinkModal.bind(this);
    this.toggleOnSharedLinkModal = this.toggleOnSharedLinkModal.bind(this);
  }

  componentDidMount() {
     //console.log('tool drawer props', this.props)
    // console.log('tool drawer this', this)
    // console.log('orientation props', this.props.orientation);
  }
  toggleOnSharedLinkModal() {
    this.setState({
      toggleSharedLinkModal: true
    })
  }

  toggleOffSharedLinkModal() {
    this.setState({
      toggleSharedLinkModal: false
    })
  }

  toggleChecked() {
    this.setState({open: !this.props.open});
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.props.open}
          onRequestChange={(open) => this.setState({open: !this.props.open})}
        >
          <MenuItem
            primaryText="Color Scheme"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Default" onClick={this.props.selectDefaultTheme} insetChildren={true} />,
              <MenuItem primaryText="Pied Piper"  onClick={this.props.selectPiedPiperTheme} insetChildren={true}/>,
              <MenuItem primaryText="Life Aquatic" onClick={this.props.selectLifeAquaticTheme} insetChildren={true}/>,
              <MenuItem primaryText="Flame" onClick={this.props.selectFlameTheme} insetChildren={true}/>,
            ]}
          />

          <MenuItem
            primaryText="Orientation"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Horizontal" onClick={this.props.selectHorizontal} insetChildren={true}/>,
              <MenuItem primaryText="Vertical" onClick={this.props.selectVertical} insetChildren={true}/>,
            ]}
          />
          <MenuItem
            primaryText="Line Style"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Curved" onClick={this.props.selectDiagonal} insetChildren={true}/>,
              <MenuItem primaryText="Elbow" onClick={this.props.selectElbow} insetChildren={true}/>,
              <MenuItem primaryText="Straight" onClick={this.props.selectStraight} insetChildren={true}/>,
            ]}
          />

          <Divider />
          {!this.props.view && <MenuItem primaryText="Share" onClick={this.toggleOnSharedLinkModal}/>}
          { this.state.toggleSharedLinkModal &&
          <SharedLinkModal
            sharedLink={this.props.sharedLink}
            toggleOffSharedLinkModal={this.toggleOffSharedLinkModal}
          />
        }
        </Drawer>
      </div>
    );
  }
}

export default ToolDrawer;

