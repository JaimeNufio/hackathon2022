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
  try {
    const url = 'https://api.yelp.com/v3/businesses/search'
    const params = {
      location: req.params.location || '80010',
      term: 'campground',
      limit: 50,
      radius: 40000,
      offset: parseInt(req.query.offset) * 50 || 0
    }

    const apiCall = await axios.get(url, {params: params, headers: commonHeader})

    let cleanedUp = apiCall.data.businesses.filter((item) => { return !(item.image_url === null) })
    let data = {}
    data.businesses = cleanedUp
    data.total = apiCall.data.total

    res.json(data)
  } catch (e) {
    res.json({'err': true})
    console.log(e)
  }
})

app.get('/specificCG/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const params = {limit: 50}
    let url = `https://api.yelp.com/v3/businesses/${req.params.id}`

    let apiCall = await axios.get(url, {params: params, headers: commonHeader})
    BusinessInfo = {}
    BusinessInfo['business'] = apiCall.data

    url = `https://api.yelp.com/v3/businesses/${req.params.id}/reviews`
    apiCall = await axios.get(url, {params: params, headers: commonHeader})
    BusinessInfo['reviews'] = apiCall.data

    res.json(BusinessInfo)
  } catch (e) {
    res.json({'err': true})
    console.log(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
