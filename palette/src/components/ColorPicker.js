import React from 'react';
import { ChromePicker } from 'react-color';

import DeltaE from 'delta-e';
import { rgb, lab } from 'd3-color';

class ColorPicker extends React.Component {
  state = {
    color1: '#254A7D',
    color2: '#013FA0',
    color3: '#0034FF',
    data: {},
    company_name: 'facebook',
  };

  handleChange1 = (color) => {
    this.setState({ color1: color.rgb });
  };

  handleChange2 = (color) => {
    this.setState({ color2: color.rgb });
  };

  handleChange3 = (color) => {
    this.setState({ color3: color.rgb });
  };

  async getData() {
    // TODO: upload json to remote
    const res = await fetch("logos.json");
    const data = await res.json();
    console.log("Obtained data.");
    this.setState({ data });
  }

  componentDidMount() {
    this.getData();
  }

  distance = (colorA, colorB) => {
    // Quantifying color distance using CIE standard on LAB colorspace
    return DeltaE.getDeltaE00(colorA, colorB);
  }

  minDistance = (colorA, palette) => {
    let distances = palette.map(colorB => this.distance(colorA, colorB))
    return Math.min.apply(Math, distances);
  }

  marshalColor = (color) => {
    let color_rgb = rgb(color['r'], color['g'], color['b'])
    let color_lab = lab(color_rgb)
    return {'L': color_lab.l, 'A': color_lab.a, 'B': color_lab.b}
  }

  submitColors = () => {
    // Marshal component state colors
    let color1 = this.marshalColor(this.state.color1);
    let color2 = this.marshalColor(this.state.color2);
    let color3 = this.marshalColor(this.state.color3);

    // Find closest logos by palette color difference
    var company_name_smallest_dist = 'None';
    var smallest_dist = Infinity;
    for (const [company_name, palette] of Object.entries(this.state.data)) {
      let minDist1 = this.minDistance(color1, palette);
      let minDist2 = this.minDistance(color2, palette);
      let minDist3 = this.minDistance(color3, palette);
      let sumMinDist = minDist1 + minDist2 + minDist3;
      if (sumMinDist < smallest_dist) {
        company_name_smallest_dist = company_name;
        smallest_dist = sumMinDist;
        console.log(company_name_smallest_dist);
        console.log(smallest_dist);
      }
    };
    console.log('done');
    this.setState({ company_name: company_name_smallest_dist })
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
        <img src={'/logos/' + this.state.company_name + '.jpg'} alt='logo' />
      </div>
    );
  }
}

export default ColorPicker;
