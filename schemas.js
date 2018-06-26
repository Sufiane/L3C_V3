'use strict'

const superstruct = require('superstruct')
const { DateTime } = require('luxon')

const basicEndPoints = ['popular', 'top_rated', 'now_playing', 'upcoming']

// defining custom types
const struct = superstruct.superstruct({
    types: {
        basicEndpoint: (value) => basicEndPoints.includes(value),
        formattedDate: (value) => DateTime.fromFormat(value, 'yyyy-MM-dd').isValid,
    }
})

/**
 * structure for basic endpoint to verify path parameter (i.e: the endpoint selected)
 */
exports.basicEndpointStruct = struct({
    endpoint: 'basicEndpoint'
})

/**
 * structure for date string to verify path parameter (i.e: the date selected)
 */
exports.formattedDateStruct = struct({
    date: 'formattedDate'
})