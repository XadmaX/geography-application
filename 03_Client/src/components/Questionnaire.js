import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

import Modal from './Modal';
import Answers from './Answers';
import { getSteps, getStepContent, countScore } from '../utils/helpers';

const styles = theme => ({
  root: {
    maxWidth: 560,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
});

class Questionnaire extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        answer: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  };

  state = {
    activeStep: 0,
    selectedAnswerIdx: null,
    steps: getSteps(this.props.questions),
    isModalOpen: false,
    selectedAnswers: [],
  };

  handleAnswerSelect = idx => {
    this.setState({ selectedAnswerIdx: idx });
  };

  handleNextQuestion = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      selectedAnswers: [...state.selectedAnswers, state.selectedAnswerIdx],
      selectedAnswerIdx: null,
      isModalOpen: state.activeStep + 1 === state.steps.length,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      selectedAnswerIdx: null,
      isModalOpen: false,
      selectedAnswers: [],
    });
  };

  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { classes, questions } = this.props;
    const {
      activeStep,
      selectedAnswerIdx,
      selectedAnswers,
      steps,
      isModalOpen,
    } = this.state;
    let score;

    if (isModalOpen) {
      score = countScore(questions, selectedAnswers);
    }

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map(({ id, question }, index) => (
            <Step key={id}>
              <StepLabel>{question}</StepLabel>
              <StepContent>
                <Answers
                  items={getStepContent(questions, index)}
                  value={selectedAnswerIdx}
                  onSelect={this.handleAnswerSelect}
                />
                <div className={classes.actionsContainer}>
                  <Button
                    disabled={selectedAnswerIdx === null}
                    variant="contained"
                    color="primary"
                    onClick={this.handleNextQuestion}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Modal
          isOpen={isModalOpen}
          onClose={this.handleCloseModal}
          onRetry={this.handleReset}
          score={score}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Questionnaire);
