/**
 * This is part of the L3C ecosystem.
 *
 * This is a simple yet powerful API to suggest one (none? more?) movie to watch each week based on the admin choice (for now)
 * and to what is actually playing in theaters (in France)
 *
 *
 * author: Sufiane 'DonDiego' Souissi
 * contact: github/sufiane
 */
'use strict'

require('dotenv').config()

const express = require('express')
const redis = require('redis')
const { DateTime } = require('luxon')
const bodyParser = require('body-parser')

const { promisify } = require('util')

const { requestMovieApi } = require('./request')
const { validateBasicEndpointPath, validateDatePath } = require('./middleware/pathMiddleware')
const generateResponseObject = require('./lib/generateResponseObject')

const app = express()
const redisClient = redis.createClient() // default: 127.0.0.1:6379

const redisGet = promisify(redisClient.get).bind(redisClient)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/selection', async (req, res) => {
    const key = DateTime.local().toFormat('WW')

    const selection = await redisGet(key).then(rawSelection => { return JSON.parse(rawSelection)})

    let response
    if (selection) {
        response = generateResponseObject.successMessage('The movie of the week !', selection)
    } else {
        response = generateResponseObject.errorMessage('No movie selected for this week ! sorry !')
    }

    res.send(response)
})

app.get('/selection/:date', validateDatePath, async (req, res) => {
    const key = DateTime.fromISO(req.params.date).toFormat('WW')

    const datedSelection = await redisGet(key).then(rawSelection => { return JSON.parse(rawSelection)})

    let response
    if (datedSelection) {
        response = generateResponseObject.successMessage('The selection of the requested week was found !', datedSelection)
    } else {
        response = generateResponseObject.errorMessage('No movie selected for the given week ! sorry !')
    }

    res.send(response)
})

app.get('/history', (req, res) => {
    return res.send({ type: 'INFORMATION', message: 'todo'})
})

app.put('/admin/selection', (req, res) => {
    const key = DateTime.local().toFormat('WW')
    const selection = req.body

    redisClient.set(key, JSON.stringify(selection))

    const response = generateResponseObject.successMessage('Selection successfully added.', selection)

    res.send(response)
})


/**
 * Same route for upcoming, top_rated, popular and now_playing.
 */
app.get('/:endpoint', validateBasicEndpointPath, (req, res) => {
    return requestMovieApi(req.params.endpoint)
        .then(result => {
            return res.send(result)
        })
})

/**
 * Handle 404.
 */
app.use((req, res) => {
    const response = generateResponseObject.errorMessage('The endpoint you wish to access does not exist.')

    return res.status(404).send(response)
})

redisClient.on('connect', () => {
    const port = process.env.PORT || 7777

    app.listen(port, () => {
        console.log(`----- L3C API V3 started, listening on ${port}`)
    })
})
    .on('error', (err) => {
    console.log('---- err redis', err)
})