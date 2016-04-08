'use strict';

module.exports = getEnv;

/**
 * Gets the current environment based on NODE_ENV var.
 */
function getEnv() {
    return {
        name: process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
    };
}
