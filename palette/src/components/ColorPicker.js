import React from 'react';
import { ChromePicker } from 'react-color';

class ColorPicker extends React.Component {
  state = {
    color1: '#0CBF00',
    color2: '#00B0FF',
    color3: '#0034FF',
  };

  handleChange1 = (color) => {
    this.setState({ color1: color.hex });
  };

  handleChange2 = (color) => {
    this.setState({ color2: color.hex });
  };

  handleChange3 = (color) => {
    this.setState({ color3: color.hex });
  };

  submitColors = () => {
    console.log(this.state.color1);
  };

  render() {
    return (
      <div>
        <ChromePicker 
          color={ this.state.color1 }
          onChange={ this.handleChange1 }
          onChangeComplete={ this.submitColors }
          />
        <ChromePicker 
          color={ this.state.color2 }
          onChange={ this.handleChange2 }
          onChangeComplete={ this.submitColors }
          />
        <ChromePicker 
          color={ this.state.color3 }
          onChange={ this.handleChange3 }
          onChangeComplete={ this.submitColors }
          />

      </div>
    );
  }
}

export default ColorPicker;
