'use strict'

const superstruct = require('superstruct')

const basicEndPoints = ['popular', 'top_rated', 'now_playing', 'upcoming']

// defining custom types
const struct = superstruct.superstruct({
    types: {
        basicEndpoint: (value) => basicEndPoints.includes(value),
    }
})

/**
 * structure for basic endpoint to verify path parameter (i.e: the endpoint selected)
 */
exports.basicEndpointStruct = struct({
    endpoint: 'basicEndpoint'
})