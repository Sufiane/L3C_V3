/**
 * Returns a formatted success message object
 * @param {string} message - a success message
 * @param {object} [selection] - a selection movie object
 * @returns {{type: string, message: *, selection: *}}
 */
exports.successMessage = (message, selection) => {
    return { type: 'SUCCESS', message, selection }
}

/**
 * Returns a formatted error message object
 * @param {string} message - an error message
 * @returns {{type: string, message: *}}
 */
exports.errorMessage = (message) => {
    return { type: 'ERROR', message }
}