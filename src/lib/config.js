'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
var env = require('./env');
var config = yaml.safeLoad(fs.readFileSync(__dirname + '/../config/config.yml', 'utf-8'));

module.exports = getConfig;

/**
 * Returns the selected environment configuration
 */
function getConfig() {
    return config[env().name] || {};
}
