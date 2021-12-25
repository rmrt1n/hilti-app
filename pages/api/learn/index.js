export default function handler(req, res) {
  const content = require('./learn.json')
  res.status(200).json(content);
}
