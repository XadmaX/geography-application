import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

class Answers extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.number,
  };

  static defaultProps = {
    items: [],
    value: null,
  };

  handleChange = event => {
    this.props.onSelect(Number(event.target.value));
  };

  render() {
    const { items, value } = this.props;

    return (
      <Box sx={{ display: 'flex' }}>
        <FormControl component="fieldset" sx={{ m: 2 }}>
          <RadioGroup
            aria-label="answers"
            name="answers"
            sx={{ my: 1 }}
            value={value}
            onChange={this.handleChange}
          >
            {items.map((item, idx) => (
              <FormControlLabel
                key={idx}
                value={String(idx)}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    );
  }
}

export default Answers;
