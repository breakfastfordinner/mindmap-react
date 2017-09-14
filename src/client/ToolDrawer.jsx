import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import NodeSlider from './Slider.jsx';


class ToolDrawer extends React.Component {

  constructor(props) {
    super(props);

  }

  toggleChecked() {
    this.setState({open: !this.props.open});
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.props.open}
          docked={false}
          onRequestChange={this.props.handleRequestClose}
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

          <MenuItem primaryText="Share" />
        </Drawer>
      </div>
    );
  }
}

export default ToolDrawer;

