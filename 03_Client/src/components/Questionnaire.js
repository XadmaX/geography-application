/*
 * TODO: Increase test coverage for edge cases (no answers, invalid index)
 * TODO: Prepare for React 19 after Vite migration
 */
import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Modal from './Modal';
import Answers from './Answers';
import { getSteps, getStepContent, countScore } from '../utils/helpers';

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

  render() {
    const { questions } = this.props;
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
      <Box sx={{ maxWidth: 560, mx: 'auto' }}>
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
                <Box sx={{ mb: 2 }}>
                  <Button
                    disabled={selectedAnswerIdx === null}
                    variant="contained"
                    color="primary"
                    onClick={this.handleNextQuestion}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Modal
          isOpen={isModalOpen}
          onRetry={this.handleReset}
          score={score}
        />
      </Box>
    );
  }
}

export default Questionnaire;
