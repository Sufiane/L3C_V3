'use strict'

const { basicEndpointStruct, formattedDateStruct } = require('../schemas')
const generateObjectResponse = require('../lib/generateResponseObject')


exports.validateBasicEndpointPath = (req, res, next) => {
    const isValidEndpoint = basicEndpointStruct.test(req.params)

    if (isValidEndpoint) {
        return next()
    }

    // to go directly to the next route
    next('route')
}

exports.validateDatePath = (req, res, next) => {
    const isValidDate = formattedDateStruct.test(req.params)

    if (!isValidDate) {
        const response = generateObjectResponse.errorMessage('The given date is not formatted correctly. (accepted format is: YYYY-MM-DD)')

        return res.status(400).send(response)
    }

    next()
}