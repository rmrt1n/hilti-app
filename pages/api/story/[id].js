export default function handler(req, res) {
  const content = require('./story.json')
  const { id } = req.query
  res.status(200).json(content.filter(e => e.id === parseInt(id))[0])
}
