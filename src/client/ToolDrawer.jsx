import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';

class ToolDrawer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
     //console.log('tool drawer props', this.props)
    // console.log('tool drawer this', this)
    // console.log('orientation props', this.props.orientation);
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
              <MenuItem primaryText="Rose" onClick={this.props.selectRoseTheme} insetChildren={true}/>,
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

