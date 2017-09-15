import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import {red400} from 'material-ui/styles/colors'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme1 = getMuiTheme({
  slider: {
    selectionColor: red400,
  }
})

const style = {
  height: '46px',
  width: '800px',
  margin: '0 auto',
  selectionColor: "#FFB400"
};

export default class NodeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstSlider: 0.5,
    };

    this.handleFirstSlider = this.handleFirstSlider.bind(this);

  }

  handleFirstSlider(event, value){
    this.props.onSlide(value);
  };

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={theme1}>
        <Slider
          style={style}
          value={this.state.firstSlider}
          onChange={this.handleFirstSlider}
          sliderStyle={style}
        >
          <div></div>
        </Slider>
      </MuiThemeProvider>
      </div>
    );
  }
}
