import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import NodeSlider from './Slider.jsx';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {pinkA200, transparent} from 'material-ui/styles/colors';
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
          openSecondary={true}
          open={this.props.open}
          docked={false}
          onRequestChange={this.props.handleRequestClose}
        >
          <List >
            <ListItem
              disabled={false}
              primaryText="Color Scheme"
              autoGenerateNestedIndicator={true}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem  primaryText="Default" onClick={this.props.selectDefaultTheme}  />,
                <ListItem primaryText="Pied Piper"  onClick={this.props.selectPiedPiperTheme} />,
                <ListItem primaryText="Life Aquatic" onClick={this.props.selectLifeAquaticTheme} />,
                <ListItem primaryText="Flame" onClick={this.props.selectFlameTheme} />,
              ]}
            />

            <ListItem
              primaryText="Orientation"
              autoGenerateNestedIndicator={true}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem primaryText="Horizontal" onClick={this.props.selectHorizontal} />,
                <ListItem primaryText="Vertical" onClick={this.props.selectVertical} />,
              ]}
            />
            <ListItem
              primaryText="Line Style"
              autoGenerateNestedIndicator={true}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem primaryText="Curved" onClick={this.props.selectDiagonal} />,
                <ListItem primaryText="Elbow" onClick={this.props.selectElbow} />,
                <ListItem primaryText="Straight" onClick={this.props.selectStraight} />,
              ]}
            />
            <Divider />

          {!this.props.view && <ListItem primaryText="Share" onClick={this.toggleOnSharedLinkModal}/>}
          { this.state.toggleSharedLinkModal &&
            <SharedLinkModal
              sharedLink={this.props.sharedLink}
              toggleOffSharedLinkModal={this.toggleOffSharedLinkModal}
            />
          }
          </List>
        </Drawer>
      </div>
    );
  }
}

export default ToolDrawer;

