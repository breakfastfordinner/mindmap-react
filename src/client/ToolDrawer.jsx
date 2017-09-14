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

class ToolDrawer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Drawer
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

            <ListItem primaryText="Share" />
          </List>
        </Drawer>
      </div>
    );
  }
}

export default ToolDrawer;

