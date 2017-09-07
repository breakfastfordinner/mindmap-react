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
    // console.log('tool drawer props', this.props)
    // console.log('tool drawer this', this)
    // console.log('orientation props', this.props.orientation);
  }

  toggleChecked() {
    this.setState({open: !this.props.open});
  }

  render() {
    return (
      <div>
        <Drawer zDepth={1} open={this.props.open}>
          <MenuItem
            primaryText="Layout"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Default" insetChildren={true} />,
              <MenuItem primaryText="Cool Color Combo"  insetChildren={true}/>,
              <MenuItem primaryText="Sweet Color Scheme" insetChildren={true}/>,
              <MenuItem primaryText="XKCD" insetChildren={true}/>,
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
              <MenuItem primaryText="Diagonal" onClick={this.props.selectDiagonal} insetChildren={true}/>,
              <MenuItem primaryText="Elbow" onClick={this.props.selectElbow} insetChildren={true}/>,
              <MenuItem primaryText="Straight" onClick={this.props.selectStraight} insetChildren={true}/>,
            ]}
          />
          <MenuItem
            primaryText="Node Shape"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Circle" insetChildren={true}/>,
              <MenuItem primaryText="Triangle" insetChildren={true}/>,
              <MenuItem primaryText="Rectangle" insetChildren={true}/>,
              <MenuItem primaryText="Star" insetChildren={true}/>,
            ]}
          />

          <Divider />
          <MenuItem primaryText="More options" />
          <MenuItem primaryText="Even more options" />
          <Divider />
          <MenuItem primaryText="Share" />
        </Drawer>
      </div>
    );
  }
}

export default ToolDrawer;

