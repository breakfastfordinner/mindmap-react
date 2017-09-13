import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const style = {
  height: '46px',
  width: '800px',
  margin: '0 auto'
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
        <Slider
          style={style}
          value={this.state.firstSlider}
          onChange={this.handleFirstSlider}
        >
          <div></div>
        </Slider>
      </div>
    );
  }
}
