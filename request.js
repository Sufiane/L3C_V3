'use strict'

const axios = require('axios')

const constants = require('./constants')

exports.requestMovieApi = (endpoint) => {
    const options = {
        method: 'get',
        url: `${constants.TMDB_API_URL}/${endpoint}`,
        params: {
            api_key: process.env.TMDB_API_TOKEN_V3,
            region: constants.region,
            language: constants.language,
        },
    }

    return axios(options)
        .then(response => {
            return { type: 'SUCCESS', data: response.data }
        })
        .catch(err => {
            return {
                type: 'ERROR',
                data: `Sorry an error occurred ! We'll dive into it ! ${err.message}`
            }
        })
}