const Sequelize = require('sequelize')

const sequelize = new Sequelize('rapiddb', 'rapiddb', 'rapiddb', {
    host : '192.168.56.101'
    , dialect : 'mysql'
})

function getRS(query)
{
    return sequelize.query(query)
}

module.exports = {
    getRS
}
