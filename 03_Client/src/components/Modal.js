import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Modal extends React.Component {
  static propTypes = {
    score: PropTypes.shape({
      total: PropTypes.number.isRequired,
      passed: PropTypes.bool.isRequired,
      correct: PropTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    score: {
      total: 0,
      passed: false,
      correct: 0,
    },
  };

  render() {
    const { isOpen, onRetry, score } = this.props;

    return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        PaperProps={{ sx: { minWidth: 600 } }}
        aria-labelledby="score-dialog-slide-title"
        aria-describedby="score-dialog-slide-description"
      >
        <DialogTitle id="score-dialog-slide-title" sx={{ textAlign: 'center' }}>
          {score.passed
            ? 'Congratulations, you passed! 🤓'
            : "You didn't pass, try again! 🤨"}
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText
                sx={{ textAlign: 'center' }}
                primary={`Total questions: ${score.total}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ textAlign: 'center' }}
                primary={`Answered correctly: ${score.correct}`}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRetry} color="primary">
            Retry
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;
