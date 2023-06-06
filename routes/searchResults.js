const express = require('express')
const axios = require('axios')
const url = require('url')

const router = express.Router()

router.get('/:query', async(req, res) => {
    
    try {
        const params = new URLSearchParams({
            access_token: process.env.API_KEY,
            ...url.parse(req.url, true).query
        })
        const query = req.params.query
        
        const {data} = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`)

        data.features.forEach((item) => {
            item.context.forEach((type) => {
                if (type.id.includes("place")) {
                item.city = item.text;
                }
                if (type.id.includes("region")) {
                item.state = item.text;
                }
            });
        });
        
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router