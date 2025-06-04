const { Router } = require('express');
const Question = require('../models/questionModel');

const router = Router();

// TODO: Add controllers

// Universal server error handler. Can be used either as middleware
// `(err, req, res)` or as a helper returning a handler when passed only `res`.
function serverError(errOrRes, req, res) {
  if (arguments.length === 1) {
    const response = errOrRes;
    return error => serverError(error, null, response);
  }

  const error = errOrRes;
  console.error('Server not working!', error);
  res.status(500).send('Server not working!');
}

/*
 * TODO: Если REST то /questions пусть отдает и так все вопросы?
 */
// get a list of questions from the db
router.get('/', (req, res) => {
  Question.find()
    .then(questions => {
      const number = parseInt(req.query.number, 10);
      if (number) {
        console.log('Show ' + number + ' questions.');
        questions = questions.slice(0, number);
      } else {
        console.log('Show all questions.');
      }
      res.json(questions);
    })
    .catch(serverError(res));
});

// get a single question from the db
router.get('/:id', (req, res) => {
  Question.findById({ _id: req.params.id }, req.body)
    .then(question => {
      console.log('Show one question');
      res.json(question);
    })
    .catch(serverError(res));
});

router.post('/', (req, res) => {
  console.log('Create new question ' + JSON.stringify(req.body));
  Question.create(req.body)
    .then(question => {
      res.json(question);
    })
    .catch(serverError(res));
});

router.put('/:id', (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Question.findOne({ _id: req.params.id }).then(question => {
        console.log('Updated question: ' + question.toString());
        res.json(question);
      });
    })
    .catch(serverError(res));
});

router.delete('/:id', (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
    .then(question => {
      console.log('Delete ' + question.toString());
      res.json(question);
    })
    .catch(serverError(res));
});

module.exports = router;
