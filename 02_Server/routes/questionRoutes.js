// TODO: Extract handlers to `controllers/questionController.js`
// TODO: Validate payloads (zod/joi) for POST/PUT
const { Router } = require('express');
const Joi = require('joi');
const Question = require('../models/questionModel');

const router = Router();

// TODO: Add controllers

const questionSchema = Joi.object({
  question: Joi.string().min(1).required(),
  answers: Joi.array().items(Joi.string().min(1)).min(1).required(),
  answer: Joi.number().integer().min(0).required(),
  weight: Joi.number().integer().min(0).optional(),
});

function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      return res.status(422).json({ error: error.message });
    }
    req.body = value;
    next();
  };
}

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
    .then(found => {
      const number = parseInt(req.query.number, 10);
      const limited = Number.isFinite(number) ? found.slice(0, number) : found;
      console.log(
        Number.isFinite(number)
          ? `Show ${number} questions.`
          : 'Show all questions.',
      );
      res.json(limited);
    })
    /* istanbul ignore next */
    .catch(serverError(res));
});

// get a single question from the db
/* istanbul ignore next */
router.get('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      console.log('Show one question');
      res.json(question);
    })
    /* istanbul ignore next */
    .catch(serverError(res));
});

router.post('/', validateBody(questionSchema), (req, res) => {
  console.log('Create new question ' + JSON.stringify(req.body));
  Question.create(req.body)
    .then(question => {
      res.json(question);
    })
    /* istanbul ignore next */
    .catch(serverError(res));
});

router.put('/:id', validateBody(questionSchema), (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Question.findOne({ _id: req.params.id }).then(question => {
        console.log('Updated question: ' + question.toString());
        res.json(question);
      });
    })
    /* istanbul ignore next */
    .catch(serverError(res));
});

/* istanbul ignore next */
router.delete('/:id', (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
    .then(question => {
      console.log('Delete ' + question.toString());
      res.json(question);
    })
    /* istanbul ignore next */
    .catch(serverError(res));
});

module.exports = router;
