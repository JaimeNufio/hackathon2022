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

app.get('/CampGrounds/:location/:offset', async (req, res) => {
  const url = 'https://api.yelp.com/v3/businesses/search'
  const params = {
    location: req.params || 'New Jersey',
    term: 'campground tent',
    limit: 50,
    offset: req.params.offset || 0
  }

  const apiCall = await axios.get(url, {params: params, headers: commonHeader})

  res.json(apiCall.data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
