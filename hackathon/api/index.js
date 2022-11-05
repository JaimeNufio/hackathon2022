const express = require('express')
const axios = require('axios')
const app = express()
const port = 3030
const keys = require('./keys.json')

const commonHeader = {
  'Authorization': `Bearer ${keys['key']}`
}

app.get('/', async (req, res) => {
  const url = 'https://api.yelp.com/v3/businesses/search'
  const params = {
    location: 'New Jersey',
    term: 'campground tent'
  }

  const got = await axios.get(url, {params: params, headers: commonHeader})
  console.log(got.data)
//   await axios.get()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
