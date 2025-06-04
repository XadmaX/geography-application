import axios from 'axios';

const mapper = questions =>
    questions.map(({ _id: id, ...props }) => ({ id, ...props }));

export const fetchQuestions = amount =>
    axios
    .get(`http://${process.env.GEO_SRV}/questions?number=${amount}`)
    .then(({ data }) => mapper(data))
    .catch(console.log);