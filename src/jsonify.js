const {getRSsWithHeaders} = require('./queer')

const getJSONRSs = (queries) => getRSsWithHeaders(queries)
.then(RSs => JSON.stringify(RSs))

module.exports = {
    getJSONRSs
}