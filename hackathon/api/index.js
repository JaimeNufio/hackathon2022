const express = require('express')
const axios = require('axios')
const app = express()
const port = 3030
const keys = require('./keys.json')
const cors = require('cors')
app.use(cors())

const commonHeader = {
  'Authorization': `Bearer ${keys['key']}`,
  'Access-Control-Allow-Origin': '*'
}

app.get('/campgrounds', async (req, res) => {
  const url = 'https://api.yelp.com/v3/businesses/search'
  const params = {
    location: req.params.location || '80010',
    term: 'campground',
    limit: 50,
    radius: 40000,
    offset: parseInt(req.query.offset) * 50 || 0
  }

  console.log(params)

  const apiCall = await axios.get(url, {params: params, headers: commonHeader})
  console.log(`Fetched at offset ${params.offset}`)
  res.json(apiCall.data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
