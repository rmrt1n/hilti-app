export default function handler(req, res) {
  const content = require('./story.json')
  res.status(200).json(content);
}
