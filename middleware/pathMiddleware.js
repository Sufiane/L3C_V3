'use strict'

const { basicEndpointStruct } = require('../schemas')

exports.validateBasicEndpointPath = (req, res, next) => {
    const isValidEndpoint = basicEndpointStruct.test(req.params)

    if (isValidEndpoint) {
        return next()
    }

    // to go directly to the next route
    next('route')
}