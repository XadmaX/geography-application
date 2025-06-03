import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(2),
  },
  group: {
    margin: `${theme.spacing(1)} 0`,
  },
});

class Answers extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
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
    const { classes, items, value } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="answers"
            name="answers"
            className={classes.group}
            value={value}
            onChange={this.handleChange}
          >
            {items.map((item, idx) => (
              <FormControlLabel
                key={item}
                value={String(idx)}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Answers);
