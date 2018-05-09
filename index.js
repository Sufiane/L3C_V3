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

const { requestMovieApi } = require('./request')
const { validateBasicEndpointPath } = require('./middleware/pathMiddleware')

const app = express()

app.get('/selection', (req, res) => {
    return res.send({ type: 'INFORMATION', message: 'todo'})
})
app.get('/history', (req, res) => {
    return res.send({ type: 'INFORMATION', message: 'todo'})
})
app.put('/admin/selection', (req, res) => {
    return res.send({ type: 'INFORMATION', message: 'todo'})
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
    return res.status(404).send({ type: 'ERROR', message: 'The endpoint you wish to access does not exist.'})
})

const port = process.env.PORT || 7777
app.listen(port, () => {
    console.log(`----- L3C API V3 started, listening on ${port}`)
})