import axios from 'axios';

const mapper = questions =>
    questions.map(({ _id: id, ...props }) => ({ id, ...props }));

export const fetchQuesions = number =>
    axios
    .get(`http://${process.env.GEO_SRV}/questions?number=${number}`)
    .then(({ data }) => mapper(data))
    .catch(console.log);