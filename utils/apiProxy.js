const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'http://localhost:3000/api'

module.exports = function(req, res, next){
	const path = req.path
  const user = req.session.user || {}
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: req.query,
    data: querystring.stringify(Object.assign({}, req.body)),
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    res.status(500).send({
      success: false,
      msg: '未知错误'
    })
  })
}