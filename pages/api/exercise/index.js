export default function handler(req, res) {
  const content = require('./exercise.json')
  res.status(200).json(content);
}
