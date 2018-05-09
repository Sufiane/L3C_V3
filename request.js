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

    console.log('---- before calling tmdb')
    console.log('--- options', options)

    return axios(options)
        .then(response => {
            console.log('---- response', response.data)

            return { type: 'SUCCESS', data: response.data }
        })
        .catch(err => {
            //console.log('----- err', err)

            return {
                type: 'ERROR',
                data: `Sorry an error occurred ! :/ we'll dive into it ! ${err.message}`
            }
        })
}